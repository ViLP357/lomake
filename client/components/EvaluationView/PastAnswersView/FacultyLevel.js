import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router'
import { Accordion, Divider } from 'semantic-ui-react'
import * as _ from 'lodash'

import { isAdmin } from '@root/config/common'
import { getProgramme } from 'Utilities/redux/studyProgrammesReducer'
import { getOldYearlyFacultyAnswersAction } from 'Utilities/redux/summaryReducer'
import { modifiedQuestions, cleanText, getMeasuresAnswer, programmeNameByKey as programmeName } from 'Utilities/common'
import Question from '../../ComparisonPage/Question'
import { yearlyQuestions as questions } from '../../../questionData'

const getTotalWritten = ({ question, allAnswers }) => {
  const mapped = allAnswers.map(data => {
    const answers = data.answers.get(question.id)
    const filteredAnswers = answers ? answers.filter(a => a.answer) : []
    return {
      year: data.year,
      answers: _.sortBy(filteredAnswers, 'name'),
    }
  })
  return mapped
}

const answersByQuestions = ({ usersProgrammes, year, oldAnswers, questionsList, lang }) => {
  if (!oldAnswers) {
    return {}
  }
  const answerMap = new Map()
  const chosenKeys = usersProgrammes.map(p => p.key)
  const selectedAnswers = oldAnswers.filter(a => a.year === year)

  if (!selectedAnswers) return new Map()
  selectedAnswers.forEach(programme => {
    const key = programme.programme
    if (chosenKeys.includes(key)) {
      const { data } = programme
      questionsList.forEach(question => {
        let colorsByProgramme = answerMap.get(question.id) ? answerMap.get(question.id) : []
        const color = data[question.color] ? data[question.color] : 'emptyAnswer'
        const name = programmeName(usersProgrammes, programme, lang)
        let answer = ''
        if (question.id.startsWith('measures')) answer = getMeasuresAnswer(data, question.id)
        else if (!question.id.startsWith('meta')) answer = cleanText(data[question.id])

        colorsByProgramme = [...colorsByProgramme, { name, key, color, answer }]
        answerMap.set(question.id, colorsByProgramme)
      })
    }
  })
  // if the programme has not yet been answered at all, it won't appear in the selectedAnswers.
  // So empty answers need to be added.
  answerMap.forEach((value, key) => {
    const answeredProgrammes = value.map(p => p.key)
    const programmesMissing = usersProgrammes.filter(p => !answeredProgrammes.includes(p.key))
    if (programmesMissing) {
      programmesMissing.forEach(p => {
        const earlierAnswers = answerMap.get(key)
        answerMap.set(key, [...earlierAnswers, { name: p.name[lang], key: p.key, color: 'emptyAnswer' }])
      })
    }
  })

  return answerMap
}

const PastAnswersViewFaculty = ({ programmeKey }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const lang = useSelector(state => state.language)
  const user = useSelector(state => state.currentUser.data)
  const [showingQuestion, setShowingQuestion] = useState(-1)

  const { pending, forProgramme } = useSelector(state => state.summaries)
  const allProgrammes = useSelector(state => state.studyProgrammes.data)
  const facultyProgrammes = Object.values(allProgrammes).filter(p => p.primaryFaculty.code === programmeKey)

  const readAccess = (user.access[programmeKey] && user.access[programmeKey].read) || isAdmin(user)
  const questionsList = modifiedQuestions(questions, lang)

  const facultyName = facultyProgrammes[0].primaryFaculty.name[lang]
  useEffect(() => {
    document.title = `${t('common:evaluation')} - ${programmeKey}`
    dispatch(getProgramme(programmeKey))
  }, [lang, programmeKey])

  useEffect(() => {
    if (!forProgramme || !pending) {
      dispatch(getOldYearlyFacultyAnswersAction(programmeKey, lang))
    }
  }, [programmeKey])
  const allAnswers = useMemo(() => {
    if (pending || !forProgramme || forProgramme.length === 0) {
      return []
    }

    const result = [2019, 2020, 2021, 2022, 2023].map(year => {
      const data = {
        year,
        answers: answersByQuestions({
          usersProgrammes: facultyProgrammes,
          year,
          oldAnswers: forProgramme,
          questionsList,
          lang,
        }),
      }
      return data
    })

    return result
  }, [forProgramme, pending, user, programmeKey])

  if (!programmeKey || !readAccess) return <Redirect to="/" />
  let titleNumberLast = 0
  let titleNumberNew = 0

  const titleList = []
  questionsList.map(question => {
    titleNumberLast = titleNumberNew
    titleNumberNew = question.titleIndex
    if (titleNumberNew !== titleNumberLast) {
      titleList.push(question.title)
      return true
    }
    return false
  })

  return (
    <>
      <h2>{facultyName}</h2>
      <h3>{t('formView:yearlyFacultyAnswers')}</h3>
      <Accordion fluid className="comparison-container">
        {titleList.map(title => (
          <div key={`${title}`}>
            <Divider section />

            <h2>{title}</h2>
            {questionsList.map(question => {
              if (question.title !== title) return false
              return (
                <div key={question.id}>
                  <Question
                    answers={getTotalWritten({ question, allAnswers, chosenKeys: [programmeKey] })}
                    question={question}
                    chosenProgrammes={[programmeKey]}
                    showing={showingQuestion === question.id}
                    handleClick={() => setShowingQuestion(showingQuestion === question.id ? -1 : question.id)}
                    form="evaluation"
                  />
                </div>
              )
            })}
          </div>
        ))}
      </Accordion>
    </>
  )
}

export default PastAnswersViewFaculty
