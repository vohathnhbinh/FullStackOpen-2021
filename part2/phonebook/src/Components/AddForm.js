import React from 'react';

const AddForm = props => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>name:</td>
              <td><input value={props.new_name} onChange={props.handleNameChange} /></td>
            </tr>
            <tr>
              <td>number:</td>
              <td><input value={props.new_number} onChange={props.handleNumberChange} /></td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default AddForm;