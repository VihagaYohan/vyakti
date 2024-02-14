import * as Yup from 'yup';

// reminder validation
export let reminderValidation = Yup.object().shape({
  title: Yup.string()
    .label('Reminder title')
    .min(2, 'Reminder title should not be less than 2 characters')
    .required('Reminder title is required'),
  frequency: Yup.string()
    .label('Frequency')
    .required('Reminder frequency is required'),
  description: Yup.string()
    .label('Description')
    .min(5, 'Description should not be less than 5 characters')
    .required('Description is required'),
  startDate: Yup.string()
    .label('Start date')
    .required('Reminder start date is required'),
  endDate: Yup.string()
    .label('End date')
    .required('Reminder end date is required'),
});
