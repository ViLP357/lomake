import React from 'react'
import { Icon, Header } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

const CommitteeTableHeader = ({ tableIds, sort, title }) => {
  const { t } = useTranslation()
  const gridColumnSize = tableIds[0].levels.length * 2 + 1
  return (
    <>
      <div className={`committee-table-header-${gridColumnSize}-left-padding`} />
      <div className={`committee-table-header-${gridColumnSize}-university`}>
        <Header block style={{ minHeight: '5em', height: 'max-content' }}>
          {' '}
          {t('overview:uniTableHeaderHY')}
        </Header>
      </div>
      <div className={`committee-table-header-${gridColumnSize}-gap`} />
      <div className={`committee-table-header-${gridColumnSize}-committee`}>
        <Header block style={{ minHeight: '5em', height: 'max-content' }}>
          {' '}
          {t('overview:uniTableHeaderCommittee')}
        </Header>
      </div>
      <div className={`committee-table-header-${gridColumnSize}-right-padding`} />
      <div className="sticky-header">
        <div className="sorter" onClick={() => sort('name')}>
          {title || t('programmeHeader')}
          <Icon name="sort" />
        </div>
      </div>
      {tableIds.map((upperLevel, index) => (
        <>
          {upperLevel.levels.map(level => (
            <div key={`${upperLevel.title}-${level}`} className={`sticky-header-categories-${gridColumnSize}`}>
              <span>{t(`overview:uniAnswerLevels:${level}`)}</span>
            </div>
          ))}
          {index === 0 && <div className="committee-table-header-second-level-gap" />}
        </>
      ))}
    </>
  )
}

export default CommitteeTableHeader
