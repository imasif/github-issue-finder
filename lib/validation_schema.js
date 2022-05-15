import * as yup from 'yup';

export const formValidationSchema = yup.object().shape({
    owner: yup
      .string()
      .required('Owner is Required'),
    reponame: yup
      .string()
      .required('Repository name is required'),
});