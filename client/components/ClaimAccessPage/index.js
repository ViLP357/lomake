import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenAction, claimTokenAction } from 'Utilities/redux/accessTokenReducer'
import { Button, Message, Icon, Input, Loader, List } from 'semantic-ui-react'
import { colors } from 'Utilities/common'
import { claimAccessTranslations as translations } from 'Utilities/translations'


const labelIcon = {
  ADMIN: 'key',
  WRITE: 'write',
  READ: 'eye',
}

export default ({ url }) => {
  const dispatch = useDispatch()
  const [localizedProgramname, setLocalizedProgramname] = useState('')
  const token = useSelector((store) => store.accessToken)
  const languageCode = useSelector((state) => state.language)
  const studyProgrammes = useSelector((state) => state.studyProgrammes.data)
  const faculties = useSelector((state) => state.faculties.data)
  const [value, setValue] = useState('')

  useEffect(() => {
    document.title = `${translations['claimPermissions'][languageCode]}`
  }, [languageCode])

  useEffect(() => {
    if (studyProgrammes && token.data) {
      if (token.data.programme) {
        const program = studyProgrammes.find((p) => p.key === token.data.programme)

        const temp = program['name'][languageCode]
          ? program['name'][languageCode]
          : program['name']['en']

        setLocalizedProgramname(temp)
      } else {
        setLocalizedProgramname(token.data.faculty)
      }
    }
  }, [languageCode, token, studyProgrammes])

  useEffect(() => {
    dispatch(getTokenAction(url))
  }, [])

  const handleClaim = (token) => {
    if (token.programme) {
      dispatch(claimTokenAction(url, false))
    } else {
      dispatch(claimTokenAction(url, true))
    }
  }

  const buttonIsDisabled = () => {
    if (['WRITE', 'READ'].includes(token.data.type)) {
      return false
    }

    const normalizedProgrammeName = localizedProgramname
      .toLowerCase()
      .replace(',', '')
      .replace("'", '')
      .replace('’', '')
      .replace('`', '')
      .replace('¨', '')

    const normalizedInput = value
      .toLowerCase()
      .replace(',', '')
      .replace("'", '')
      .replace('’', '')
      .replace('`', '')
      .replace('¨', '')

    return normalizedProgrammeName !== normalizedInput
  }

  if (!token.data && token.error)
    return (
      <span data-cy="invalidTokenError" style={{ color: colors.red }}>
        {translations.invalidToken[languageCode]}
      </span>
    )

  if (!token.data || !faculties) return <Loader active inline />

  const getProgrammeNames = (onlyDoctorProgrammes = false) => {
    let programmeCodes = faculties.find((f) => f.code === token.data.faculty).programmes

    if (onlyDoctorProgrammes) {
      programmeCodes = programmeCodes.filter((code) => code[0] === 'T')
    }

    const localizedProgrammeCodes = programmeCodes.map((pCode) => {
      const prog = studyProgrammes.find((p) => p.key === pCode)
      return prog.name[languageCode]
    })

    return localizedProgrammeCodes
  }

  if (token.data.programme) {
    return (
      <div style={{ width: '50em', margin: '1em auto' }}>
        <Message color="blue" icon="exclamation" content={translations.prompt[languageCode]} />
        <div style={{ fontWeight: 'bold' }}>{localizedProgramname}</div>
        <div
          style={{ fontSize: '1.5em', fontWeight: 'bolder', height: '1.25em', margin: '0.5em 0' }}
        >
          <Icon color="blue" name={labelIcon[token.data.type]} size="small" />{' '}
          {translations.rights[token.data.type][languageCode]}
        </div>
        {token.data.type === 'ADMIN' && (
          <div style={{ margin: '1.2em 0' }}>
            <Input
              data-cy="claimAccessPage-confirmation-input"
              style={{ width: '700px' }}
              size="large"
              placeholder={localizedProgramname}
              value={value}
              onChange={(e, { value }) => setValue(value)}
            />
            <div
              className={`claimAccesspage-adminMessage ${buttonIsDisabled() ? 'error' : 'valid'}`}
            >
              {translations.confirmPrompt[languageCode]}
            </div>
          </div>
        )}
        <Button
          data-cy="claim-button"
          disabled={buttonIsDisabled()}
          onClick={() => handleClaim(token.data)}
        >
          {translations.buttonText[languageCode]}
        </Button>{' '}
      </div>
    )
  }

  if (token.data.type === 'READ_DOCTOR') {
    return (
      <div style={{ width: '50em', margin: '1em auto' }}>
        <Message color="blue" icon="exclamation" content={translations.prompt[languageCode]} />
        <h2>{faculties.find((f) => f.code === token.data.faculty).name}</h2>
        <List bulleted>
          {getProgrammeNames(true).map((name) => (
            <List.Item data-cy="programmeList-item" key={name}>
              {name}
            </List.Item>
          ))}
        </List>
        <div
          style={{ fontSize: '1.5em', fontWeight: 'bolder', height: '1.25em', margin: '0.5em 0' }}
        >
          <Icon color="blue" name={labelIcon['READ']} size="small" />{' '}
          {translations.rights['READ'][languageCode]}
        </div>
        <Button data-cy="claim-button" onClick={() => handleClaim(token.data)}>
          {translations.buttonText[languageCode]}
        </Button>{' '}
      </div>
    )
  }

  return (
    <div style={{ width: '50em', margin: '1em auto' }}>
      <Message color="blue" icon="exclamation" content={translations.prompt[languageCode]} />
      <h2>{faculties.find((f) => f.code === token.data.faculty).name}</h2>
      <List bulleted>
        {getProgrammeNames().map((name) => (
          <List.Item data-cy="programmeList-item" key={name}>
            {name}
          </List.Item>
        ))}
      </List>
      <div style={{ fontSize: '1.5em', fontWeight: 'bolder', height: '1.25em', margin: '0.5em 0' }}>
        <Icon color="blue" name={labelIcon[token.data.type]} size="small" />{' '}
        {translations.rights[token.data.type][languageCode]}
      </div>
      {token.data.type === 'ADMIN' && (
        <div style={{ margin: '1.2em 0' }}>
          <Input
            style={{ width: '700px' }}
            size="large"
            placeholder={localizedProgramname}
            value={value}
            onChange={(e, { value }) => setValue(value)}
          />
          <div className={`claimAccesspage-adminMessage ${buttonIsDisabled() ? 'error' : 'valid'}`}>
            {translations.confirmPrompt[languageCode]}
          </div>
        </div>
      )}
      <Button
        data-cy="claim-button"
        disabled={buttonIsDisabled()}
        onClick={() => handleClaim(token.data)}
      >
        {translations.buttonText[languageCode]}
      </Button>{' '}
    </div>
  )
}
