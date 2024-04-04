/* eslint-disable no-useless-escape */
import * as yup from 'yup';

export const schema = () => {
    const message = "Please enter the required information: "
    return yup.object({
    content: yup
        .mixed()
        .required(`${message} Comment`)
        .test("content",`${message} Comment`,(value) =>{
            if(!value || value && value === "")
            {
                return false
            }
            return true
        }),
    })
};
