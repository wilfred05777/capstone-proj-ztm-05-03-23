import React from 'react'
// import './form-input.styles.scss'
import { FormInputLabel, Input, Group } from './form-input.styles'

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={otherProps.value.length}
          // className={`${
          //   otherProps.value.length ? 'shrink' : ''
          // } form-input-label`}
          // htmlFor='displayName'
        >
          {label}
        </FormInputLabel>
      )}

      {/* <input className='form-input' {...otherProps} /> */}

      {/* <input
        name='displayName'
        value={displayName}
        onChange={changeHandler}
        type='text'
        required
      /> */}
    </Group>
  )
}

export default FormInput
