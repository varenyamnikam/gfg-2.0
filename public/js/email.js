import axios from 'axios';
import { showAlert } from './alerts';

export const sendEmail = async (name, phone, email, subject, message) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:5000/sendMail',
      data: {
        name,
        phone,
        email,
        subject,
        message,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Email Sent Successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'OOPS! An Error Occured');
  }
};
