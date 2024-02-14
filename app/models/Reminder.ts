interface Reminder {
  id?: string;
  title: string;
  frequency: string;
  description: string;
  startDate: string;
  endDate: string;
  documentId?: string;
}

export default Reminder;
