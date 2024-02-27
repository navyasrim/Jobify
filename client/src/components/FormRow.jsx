const FormRow = ({ type, name, lblText, defaultValue, onChange }) => {
    return (

        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {lblText || name}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                className='form-input'
                defaultValue={defaultValue}
                onChange={onchange}
                required
            />
        </div>

    );
};
export default FormRow;