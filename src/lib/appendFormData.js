const appendFormData = (data) => {
    const formData = new FormData();
  
    // Append simple fields
    formData.append("email", data.email);
    formData.append("title", data.title);
    formData.append("type", data.type);
    formData.append("details", data.details);
    formData.append("configuration", data.configuration);
    formData.append("timeAndDate", data.timeAndDate);
    formData.append("location", data.location);
    formData.append("eventformate", data.eventformate);
    formData.append("venuName", data.venuName);
    formData.append("venuAddress", data.venuAddress);
    formData.append("organizerProfile", data.organizerProfile);
    formData.append("contact", data.contact);
    formData.append("capacity", data.capacity);
    formData.append("RegistrationDeadline", data.RegistrationDeadline);
    formData.append("isFree", data.isFree);
    formData.append("price", data.price);
  
    // Append Cover Image
    if (data.coverimage) {
      formData.append("coverimage", data.coverimage);
    }
  
    // Append Speakers
    data.Speakers.forEach((speaker, index) => {
      formData.append(`Speakers[${index}][name]`, speaker.name);
      formData.append(`Speakers[${index}][bio]`, speaker.bio);
      formData.append(`Speakers[${index}][expertise]`, speaker.expertise);
  
      // Append socialMedia links
      if (speaker.socialMedia) {
        Object.keys(speaker.socialMedia).forEach((key) => {
          formData.append(`Speakers[${index}][socialMedia][${key}]`, speaker.socialMedia[key]);
        });
      }
  
      // Append speaker profile image
       
      if (speaker.profileImage) {
        formData.append(`Speakers[${index}][profileImage]`, speaker.profileImage);
      }
    });
  
    // Append Agenda
    data.agenda.forEach((session, index) => {
      formData.append(`agenda[${index}][sessionName]`, session.sessionName);
      formData.append(`agenda[${index}][date]`, session.date);
      formData.append(`agenda[${index}][starttime]`, session.starttime);
      formData.append(`agenda[${index}][endtime]`, session.endtime);
      formData.append(`agenda[${index}][duration]`, session.duration);
      formData.append(`agenda[${index}][sessiondetail]`, session.sessiondetail);
    });
    console.log("FormData emial in function:", formData.email);
  
   
    return formData;
  };
  

  export default appendFormData;