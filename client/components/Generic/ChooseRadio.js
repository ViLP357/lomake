import React, { useState, useEffect } from 'react'
import { Divider, Popup, Icon } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { updateFormField } from 'Utilities/redux/formReducer'

import { colors, getForm } from 'Utilities/common'
import BasicRadio from './BasicRadio'
import './Generic.scss'

const ChooseRadio = ({ id, label, description, required, extrainfo, radioOptions, direction, formType }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({ value: '' })
  const dataFromRedux = useSelector(({ form }) => form.data[id] || '')
  const lang = useSelector(state => state.language)
  const viewOnly = useSelector(({ form }) => form.viewOnly)
  const form = getForm(formType)
  const choose = (field, value) => dispatch(updateFormField(field, value, form))

  const handleClick = label => {
    setState({ value: label })
    choose(id, label)
  }
  useEffect(() => {
    setState({ value: dataFromRedux })
  }, [dataFromRedux])

  let radioButtonLabels

  if (typeof radioOptions === 'string') {
    let idkButton
    if (lang === 'fi') {
      idkButton = 'En osaa sanoa'
    } else if (lang === 'se') {
      idkButton = "I don't know"
    } else {
      idkButton = "I don't know"
    }
    radioButtonLabels = [
      { id: 'number-first', label: 1 },
      { id: 'number-second', label: 2 },
      { id: 'number-third', label: 3 },
      { id: 'number-fourth', label: 4 },
      { id: 'number-fifth', label: 5 },
      { id: 'text-idk', label: idkButton },
    ]
  } else {
    radioButtonLabels = radioOptions ? radioOptions[lang] : null
  }
  return (
    <div className="form-choose-radio-area" data-cy={`choose-radio-container-${id}`}>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ maxWidth: '750px' }}>
          <h3>
            {label} {required && <span style={{ color: colors.red, marginLeft: '0.2em', fontWeight: '600' }}>*</span>}
            <Popup
              content={
                <>
                  <p>1 = Täyin eri mieltä</p>
                  <p>2 = Osittain eri mieltä§</p>
                  <p>3 = Ei samaa eikä eri mieltä</p>
                  <p>4 = Osittain samaa mieltä§</p>
                  <p>5 = Täysin samaa mieltä</p>
                </>
              }
              popper={{ id: 'popper-container', style: { zIndex: 2000 } }}
              trigger={<Icon style={{ marginLeft: '0.5em', color: 'grey' }} name="question circle outline" />}
            />
          </h3>
        </div>
      </div>
      {description?.length > 1 ? (
        <div className="choose-radio-description">
          {description}
          <p className="form-question-extrainfo">{extrainfo}</p>
        </div>
      ) : (
        <div style={{ height: '1em' }} />
      )}
      <BasicRadio
        id={id}
        direction={direction}
        handleClick={handleClick}
        checked={state.value}
        disabled={viewOnly}
        radioButtonLabels={radioButtonLabels}
      />
    </div>
  )
}

export default ChooseRadio
