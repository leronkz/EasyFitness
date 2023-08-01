import React from "react";
import styles from './editable-input.module.css';
import { InputAdornment, TextField } from "@mui/material";
function EditableInput({initialValue, setValue, inputType, isEditing}) {

    const handleInputChange = (e) => {
        setValue(e.target.value);
    }

    return(
        <div className={styles.inputForm}>
            {isEditing ? (
                 <input id={styles.editableInput} type={inputType} value={initialValue} onChange={handleInputChange}/>
            ):(
                <p className={styles.inputText}>{initialValue}</p>
            )}
        </div>
    );
}
export default EditableInput;