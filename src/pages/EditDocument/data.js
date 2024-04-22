/* eslint-disable no-useless-escape */
import * as yup from 'yup';

export const schema = () => {
    const message = "Please enter the required information: "
    return yup.object({
        department: yup
            .mixed()
            .required(`${message} Department`),
        section: yup
            .mixed()
            .required(`${message} Section`),
        // unit: yup
        //     .mixed()
        //     .test("unit",`${message} Unit`,(value) =>{
        //         if(!value)
        //         {
        //             return false
        //         }
        //         return true
        //     }),
        category: yup
            .mixed()
            .required(`${message} Category`),
        documentType: yup
            .mixed()
            .required(`${message} Document type`),
        subject: yup
            .string()
            .required(`${message} Subject`),
        content: yup
            .string()
            .required(`${message} Content summary`),
        approve: yup
            .mixed()
            .test("approve", `${message} Documents to be approved/signed`, (value) => {
                if (!value || value && value.length === 0) {
                    return false
                }
                return true
            }),
        // reference: yup
        //     .mixed()
        //     .test("reference",`${message} Documents for reference`,(value) =>{
        //         if(!value || value && value.length === 0)
        //         {
        //             return false
        //         }
        //         return true
        //     }),
        approvers: yup
            .mixed()
            .when("approve", {
                is: (approve) => approve && approve.length > 0,
                then: (schema) => schema.test("approve", `${message} Approver`, (value) => {
                    let isValid = true;
                    if (!value || value.length === 0) {
                        isValid = false;
                    } else {
                        value.forEach(item => {
                            if (item.userName === undefined && item.selectedOption === undefined) {
                                isValid = false;
                            }
                        });
                    }
                    return isValid;
                }),
            }),
        signers: yup
            .mixed()
            .when("approve", {
                is: (approve) => approve && approve.length > 0,
                then: (schema) => schema.test("signers", `${message} Signers/Seal (if any)`, (value) => {
                    let isValid = true;
                    if (!value || value.length === 0) {
                        isValid = false;
                    } else {
                        value.forEach(item => {
                            if (item.userName === undefined && item.selectedOption === undefined) {
                                isValid = false;
                            }
                        });
                    }
                    return isValid;
                }),
            })
    })
};
