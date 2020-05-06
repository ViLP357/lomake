import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFormField } from 'Utilities/redux/formReducer'
import ReactMarkdown from 'react-markdown'
import { Button } from 'semantic-ui-react'
import SimpleTextarea from './SimpleTextarea'
import LastYearsAnswersAccordion from './LastYearsAnswersAccordion'

const translations = {
  measureLabel: {
    fi: 'Lisää 1-5 toimenpidettä',
    en: 'Add 1-5 measures',
    se: '',
  },
}

const Measures = ({ label, id, required, number, previousYearsAnswers }) => {
  const dispatch = useDispatch()
  const clearMeasure = (number) => dispatch(updateFormField(`${id}_${number}_text`, ''))
  const formData = useSelector((state) => state.form.data)
  const languageCode = useSelector((state) => state.language)
  const viewOnly = useSelector(({ form }) => form.viewOnly)

  useEffect(() => {
    let measureNumber = 1
    while (measureNumber <= 5) {
      if (formData[`${id}_${measureNumber}_text`]) {
        measureNumber++
      } else {
        break
      }
    }

    // even if no text always at least one text field shown
    if (measureNumber === 1) {
      setAmountOfMeasures(1)
      return
    }

    setAmountOfMeasures(measureNumber - 1)
  }, [formData])

  const getPreviousMeasureAnswers = () => {
    if (!previousYearsAnswers) return null
    if (!!previousYearsAnswers[id]) return previousYearsAnswers[id]
    if (!!previousYearsAnswers[`${id}_text`]) return previousYearsAnswers[`${id}_text`]

    if (!!previousYearsAnswers[`${id}_1_text`]) {
      let measures = ''
      let i = 1
      while (i < 6) {
        if (!!previousYearsAnswers[`${id}_${i}_text`])
          measures += `${i}) ${previousYearsAnswers[`${id}_${i}_text`]}  \n`
        i++
      }

      return measures
    }

    return null
  }

  const previousAnswerText = getPreviousMeasureAnswers()

  const [amountOfMeasures, setAmountOfMeasures] = useState(1)

  return (
    <>
      <h3>
        {number}. {label} {required && <span style={{ color: 'red', marginLeft: '0.2em' }}>*</span>}
      </h3>
      <p
        style={{
          lineHeight: 2,
          backgroundColor: '#daedf4',
          padding: '1em',
          borderRadius: '5px',
          margin: '1em 0',
        }}
      >
        {translations.measureLabel[languageCode]}
      </p>
      {previousAnswerText && (
        <LastYearsAnswersAccordion>
          <ReactMarkdown source={previousAnswerText} />
        </LastYearsAnswersAccordion>
      )}
      {['', '', '', '', ''].reduce((acc, cur, index) => {
        if (index + 1 > amountOfMeasures) return acc
        acc.push(
          <div style={{ paddingTop: '0' }} key={index}>
            <SimpleTextarea label={`${index + 1})`} id={`${id}_${index + 1}`} viewOnly={viewOnly} />
          </div>
        )
        return acc
      }, [])}
      {!viewOnly && (
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            className="ui button"
            disabled={amountOfMeasures === 5 || !formData[`${id}_${amountOfMeasures}_text`]}
            onClick={() => setAmountOfMeasures(amountOfMeasures + 1)}
          >
            Add measure
          </Button>
          <span style={{ marginLeft: '5px' }}>
            <Button
              className="ui button"
              disabled={amountOfMeasures === 1}
              onClick={() => {
                clearMeasure(amountOfMeasures)
                setAmountOfMeasures(amountOfMeasures - 1)
              }}
            >
              Remove measure
            </Button>
          </span>
        </div>
      )}
    </>
  )
}

export default Measures
