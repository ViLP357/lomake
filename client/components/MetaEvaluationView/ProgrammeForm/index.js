import React, { useEffect } from 'react'
import MetaEntity from 'Components/Generic/MetaEntity'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router'
import { getProgramme } from 'Utilities/redux/studyProgrammesReducer'

import { metareviewQuestions as questions } from '../../../questionData'
// tämä on samanlainen kuin Evaluationiew/EvaluationFormView/index.js

// eslint-disable-next-line no-unused-vars
const ProgrammeLevelForm = ({ room, formString }) => {
  const lang = useSelector(state => state.language)
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser.data)

  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t('meta-evaluation')} - ${room}`
    dispatch(getProgramme(room))
  }, [lang, room])

  if (!user || !room) return <Redirect to="/" />

  const partComponentMap = {
    META_ENTITY: MetaEntity,
  }

  const partMap = part => {
    const Component = partComponentMap[part.type]

    const divStyle = {}
    const form = 7
    const number = 1
    const label = part.label[lang]

    return (
      <div key={part.id} style={divStyle}>
        <Component
          id={part.id}
          label={label}
          description={part.description[lang]}
          required={part.required}
          number={number}
          options={part.options}
          lang={lang}
          radioOptions={part.radioOptions}
          form={form}
          actions={part.actions[lang]}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Programme Level form</h1>
      {questions.map(question => (
        <div key={question.id}>{partMap(question)}</div>
      ))}
    </div>
  )
}

export default ProgrammeLevelForm
