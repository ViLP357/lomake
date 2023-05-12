import React, { useEffect, useMemo } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Redirect, useHistory } from 'react-router'
import { Button, Icon, Loader } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
import { isAdmin } from '@root/config/common'

import { setViewOnly, getSingleProgrammesAnswers } from 'Utilities/redux/formReducer'
import { wsJoinRoom, wsLeaveRoom } from 'Utilities/redux/websocketReducer'
import NavigationSidebar from 'Components/FormView/NavigationSidebar'
import StatusMessage from 'Components/FormView/StatusMessage'
import SaveIndicator from 'Components/FormView/SaveIndicator'

import postItImage from 'Assets/post_it.jpg'
import { colors } from 'Utilities/common'
import EvaluationForm from '../EvaluationFormView/EvaluationForm'

import { facultyEvaluationQuestions as questions } from '../../../questionData'

// TO FIX now only admin can write
const formShouldBeViewOnly = ({ draftYear, year, formDeadline, form, user }) => {
  if (!isAdmin(user)) return true
  if (!draftYear) return true
  if (draftYear && draftYear.year !== year) return true
  if (formDeadline?.form !== form) return true
  return false
}

const findAnswers = (programmes, allAnswers, question) => {
  const result = {
    bachelor: { programmes: [], green: [], yellow: [], red: [], gray: [] },
    master: { programmes: [], green: [], yellow: [], red: [], gray: [] },
    doctoral: { programmes: [], green: [], yellow: [], red: [], gray: [] },
  }
  programmes.forEach(({ key, level, name }) => {
    const { data } = allAnswers.find(a => a.programme === key)
    const light = data[`${question}_light`]
    result[level].programmes.push({ key, name, light: light || null })
    if (light) {
      result[level][light].push(name)
    } else {
      result[level].gray.push(name)
    }
  })
  return result
}

const FacultyFormView = ({ room, formString }) => {
  const history = useHistory()
  const form = parseInt(formString, 10) || null
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const lang = useSelector(state => state.language)
  const user = useSelector(state => state.currentUser.data)
  const { draftYear, nextDeadline } = useSelector(state => state.deadlines)
  const formDeadline = nextDeadline ? nextDeadline.find(d => d.form === form) : null
  const currentRoom = useSelector(state => state.room)
  const year = 2023 // the next time form is filled is in 2026

  const faculties = useSelector(state => state.faculties.data)
  const faculty = faculties ? faculties.find(f => f.code === room) : null
  const singleFacultyPending = useSelector(state => state.studyProgrammes.singleProgramPending)

  const progEvaluationAnswers = useSelector(state => state.oldAnswers.data.filter(a => a.form === 4 && a.year === year))
  const oodiFacultyURL = `https://oodikone.helsinki.fi/evaluationoverview/faculty/${room}`

  useEffect(() => {
    document.title = `${t('evaluation')} - ${room}`
  }, [lang, room])

  useEffect(() => {
    if (!faculty || !form) return
    dispatch(getSingleProgrammesAnswers({ room, year, form }))
    if (
      formShouldBeViewOnly({
        draftYear,
        year,
        formDeadline,
        form,
        user,
      })
    ) {
      dispatch(setViewOnly(true))
      if (currentRoom) dispatch(wsLeaveRoom(room))
    } else {
      dispatch(wsJoinRoom(room, form))
      dispatch(setViewOnly(false))
    }
  }, [
    faculty,
    singleFacultyPending,
    // writeAccess,
    // viewingOldAnswers,
    draftYear,
    // accessToTempAnswers,
    // readAccess,
    room,
    user,
  ])

  const facultyProgrammeAnswers = useMemo(() => {
    if (!progEvaluationAnswers) {
      return {}
    }
    const facultyProgrammes = faculty.ownedProgrammes.map(p => {
      return { key: p.key, level: p.level, name: p.name }
    })
    const result = {}
    questions.forEach(q => {
      q.parts.forEach(part => {
        if (part.relatedEvaluationQuestion) {
          result[part.id] = findAnswers(facultyProgrammes, progEvaluationAnswers, part.relatedEvaluationQuestion)
        }
      })
    })
    return result
  }, [room, user, progEvaluationAnswers])

  // To fix texts -prog -> faculty

  // TO FIX To be removed and porer rights to be set
  if (!isAdmin(user)) return <Redirect to="/" />

  if (!room || !form) return <Redirect to="/" />

  //   if (!readAccess && !writeAccess) return <NoPermissions t={t} />

  return (
    <>
      {singleFacultyPending ? (
        <Loader active />
      ) : (
        <div className="form-container">
          <NavigationSidebar programmeKey={room} formType="evaluation" formNumber={form} />
          <div className="the-form">
            <div className="form-instructions">
              <div className="hide-in-print-mode">
                <SaveIndicator />
                <div style={{ marginBottom: '2em' }}>
                  <Button onClick={() => history.push('/evaluation-faculty')} icon="arrow left" />
                </div>
                <img alt="form-header-calendar" className="img-responsive" src={postItImage} />
              </div>
              <h1 style={{ color: colors.blue }}>{faculty?.name[lang]}</h1>
              <h3 style={{ marginTop: '0' }} data-cy="formview-title">
                {t('evaluation')} 2023
              </h3>

              <div className="hide-in-print-mode">
                <StatusMessage programme={room} form={form} />
                <div
                  style={{
                    lineHeight: 2,
                    backgroundColor: colors.background_blue,
                    padding: '1.5em 0.5em',
                    borderRadius: '5px',
                    margin: '2em 0em 1em 0em',
                  }}
                >
                  <p>
                    <Trans i18nKey="formView:evaluationInfo1" />
                  </p>
                </div>
                <p>{t('formView:info2')}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="big-circle-green" />
                {t('positive')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="big-circle-yellow" />
                {t('neutral')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="big-circle-red" />
                {t('negative')}
              </div>

              <div style={{ marginTop: '2em' }}>
                <h4 data-cy="formview-links">Taustamateriaali</h4>
                <p>
                  Alla olevasta linkistä voitte tarkastella kootusti kaikkia tiedekunnan katselmointikierroksella
                  kirjattuja vastauksia.
                </p>
                <p>
                  Lisäksi tässä lomakkeessa on kunkin kysymyksen yhteyteen lisätty tiivistelmä tiedekunnan
                  katselmointikysymysten vastauksista.
                </p>
                <p>
                  Oodikoneseen on luotu näkymä katselmoinnin tueksi. Tähän näkymään on kerätty keskeisimpiä tilastoja
                  tiedekuntanne opiskelijoista ja heidän opintojensa etenemisestä. Alla linkki tiedekuntatason näkymään.
                </p>
              </div>

              <div
                className="past-answers-link"
                style={{
                  lineHeight: 2,
                  backgroundColor: colors.background_blue,
                  padding: '1.5em 0.5em',
                  borderRadius: '5px',
                  margin: '2em 0em 1em 0em',
                }}
              >
                {/* <Link data-cy={`link-to-old-${room}-answers`} to={summaryURL} target="_blank">
                  <h4 style={{ marginBottom: '0.5em' }}>
                    Tarkastele kaikkia aiempien vuosiseurontojen vastauksia <Icon name="external" />{' '}
                  </h4>
                </Link> */}
                <a href={oodiFacultyURL} data-cy={`link-to-oodikone-faculty-${room}`} target="_blank" rel="noreferrer">
                  <h4>
                    Tarkastele tiedekunnan tietoja Oodikonessa <Icon name="external" />{' '}
                  </h4>
                </a>
              </div>
            </div>
            <div style={{ paddingBottom: '6em' }}>
              <EvaluationForm
                programmeKey={faculty.code}
                questions={questions}
                form={form}
                summaryData={facultyProgrammeAnswers}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FacultyFormView
