import React, { useState, useEffect, useMemo } from 'react'
import { Dropdown, Header, Input, Radio } from 'semantic-ui-react'
import './OverviewPage.scss'
import SmileyTable from './SmileyTable'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import ProgramControlsContent from './ProgramControlsContent'
import CsvDownload from '../Generic/CsvDownload'
import CustomModal from 'Components/Generic/CustomModal'
import StatsContent from './StatsContent'
import useDebounce from '../../util/useDebounce'
import {translations} from '../../util/translations'
import YearSelector from './YearSelector'


export default () => {
  const [filter, setFilter] = useState('')
  const debouncedFilter = useDebounce(filter, 200)
  const [modalData, setModalData] = useState(null)
  const [showUnclaimedOnly, setShowUnclaimedOnly] = useState(false)
  const [programControlsToShow, setProgramControlsToShow] = useState(null)
  const [statsToShow, setStatsToShow] = useState(null)
  const [showCsv, setShowCsv] = useState(false)

  const languageCode = useSelector((state) => state.language)
  const currentUser = useSelector((state) => state.currentUser)
  const programmes = useSelector(({ studyProgrammes }) => studyProgrammes.data)

  useEffect(() => {
    document.title = `${translations['overviewPage'][languageCode]}`
  }, [languageCode])

  const handleChange = ({ target }) => {
    const { value } = target
    setFilter(value)
  }

  const usersProgrammes = useMemo(() => {
    const usersPermissionsKeys = Object.keys(currentUser.data.access)
    return currentUser.data.admin
      ? programmes
      : programmes.filter((program) => usersPermissionsKeys.includes(program.key))
  }, [programmes, currentUser.data])

  const filteredProgrammes = useMemo(() => {
    return usersProgrammes.filter((prog) => {
      if (showUnclaimedOnly && prog.claimed) return
      const searchTarget = prog.name[languageCode] ? prog.name[languageCode] : prog.name['en'] // Because sw and fi dont always have values.
      return searchTarget.toLowerCase().includes(debouncedFilter.toLowerCase())
    })
  }, [usersProgrammes, showUnclaimedOnly, languageCode, debouncedFilter])

  return (
    <>
      {modalData && (
        <CustomModal
          title={modalData.header}
          closeModal={() => setModalData(null)}
          borderColor={modalData.color}
        >
          <>
            <div style={{ paddingBottom: '1em' }}>{modalData.programme}</div>
            <div style={{ fontSize: '1.2em' }}>
              <ReactMarkdown source={modalData.content} />
            </div>
          </>
        </CustomModal>
      )}

      {programControlsToShow && (
        <CustomModal
          title={`${translations.accessControl[languageCode]} - ${
            programControlsToShow.name[languageCode]
              ? programControlsToShow.name[languageCode]
              : programControlsToShow.name['en']
          }`}
          closeModal={() => setProgramControlsToShow(null)}
        >
          <ProgramControlsContent programKey={programControlsToShow.key} />
        </CustomModal>
      )}

      {statsToShow && (
        <CustomModal title={statsToShow.title} closeModal={() => setStatsToShow(null)}>
          <StatsContent
            stats={statsToShow.stats}
            answers={statsToShow.answers}
            questionId={statsToShow.questionId}
          />
        </CustomModal>
      )}

      {usersProgrammes.length > 0 ? (
        <>
          <div className="wide-header">
            <Dropdown
              className="button basic gray"
              direction="left"
              text={translations.csvDownload[languageCode]}
              onClick={() => setShowCsv(true)}>
              {showCsv ?
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <CsvDownload wantedData="written" view="overview"/>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <CsvDownload wantedData="smileys" view="overview"/>
                  </Dropdown.Item>
                </Dropdown.Menu>
              : null}
            </Dropdown>
          </div>
          <YearSelector />
          <div style={{ marginTop: '1em' }}>
            {usersProgrammes.length > 10 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '1em 0',
                  alignItems: 'center',
                }}
              >
                <Input
                  style={{ width: '200px' }}
                  data-cy="overviewpage-filter"
                  name="filter"
                  icon="filter"
                  placeholder={translations.filter[languageCode]}
                  onChange={handleChange}
                  value={filter}
                />
                {currentUser.data.admin && (
                  <div>
                    <Radio
                      style={{ marginTop: '1em' }}
                      checked={showUnclaimedOnly}
                      onChange={() => setShowUnclaimedOnly(!showUnclaimedOnly)}
                      label={translations['showUnclaimedOnly'][languageCode]}
                      toggle
                    />
                  </div>
                )}
              </div>
            )}
            <SmileyTable
              filteredProgrammes={filteredProgrammes}
              setModalData={setModalData}
              setProgramControlsToShow={setProgramControlsToShow}
              setStatsToShow={setStatsToShow}
              isBeingFiltered={debouncedFilter !== ''}
            />
          </div>
        </>
      ) : (
        <Header
          data-cy="noPermissions-message"
          style={{ textAlign: 'center', paddingTop: '5em' }}
          as="h2"
          disabled
        >
          {translations.noPermissions[languageCode]}
        </Header>
      )}
    </>
  )
}
