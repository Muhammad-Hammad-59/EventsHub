import { Controller, useFieldArray } from 'react-hook-form';
import TextareaField from './fromComponent/TextareaField';
import InputField from './fromComponent/InputField';
import Button from './fromComponent/Button';
 

const SpeakerForm = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Speakers"
  });

  const addSpeaker = () => {
    append({
      name: '',
      profileImage: '',
      bio: '',
      expertise: '',
      socialMedia: {
        linkedin: '',
        twitter: '',
        instagram: '',
        personalWebsite: ''
      }
    });
  };

  return (
    <div>
      {fields.length === 0 && (
        <p className="text-gray-500 text-center py-4">No speakers added yet.</p>
      )}
      
      {fields.map((field, index) => {
        const speakerErrors = errors?.Speakers?.[index];
        
        return (
          <div 
            key={field.id} 
            className="bg-gray-50 p-5 rounded-md mb-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Speaker {index + 1}</h3>
              <Button 
                variant="danger" 
                onClick={() => remove(index)}
                className="text-xs px-2 py-1"
              >
                Remove
              </Button>
            </div>
            
            <InputField
              label="Name"
              id={`Speakers.${index}.name`}
              error={speakerErrors?.name?.message}
              required
              {...control.register(`Speakers.${index}.name`, { 
                required: 'Speaker name is required' 
              })}
            />
            
            <Controller
  name={`Speakers.${index}.profileImage`}
  control={control}
  rules={{ required: 'Profile image is required' }}
  render={({ field: { onChange, ...field } }) => (
    <InputField
      label="Profile Image"
      id={`Speakers.${index}.profileImage`}
      type="file"
      accept="image/*"
      error={speakerErrors?.profileImage?.message}
      required
      onChange={(e) => onChange(e.target.files[0])} // ✅ extract File
      {...field}
    />
  )}
/>
            
            <TextareaField
              label="Biography"
              id={`Speakers.${index}.bio`}
              error={speakerErrors?.bio?.message}
              {...control.register(`Speakers.${index}.bio`)}
            />
            
            <InputField
              label="Expertise"
              id={`Speakers.${index}.expertise`}
              error={speakerErrors?.expertise?.message}
              required
              {...control.register(`Speakers.${index}.expertise`, { 
                required: 'Expertise is required' 
              })}
            />
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">Social Media</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="LinkedIn"
                  id={`Speakers.${index}.socialMedia.linkedin`}
                  error={speakerErrors?.socialMedia?.linkedin?.message}
                  {...control.register(`Speakers.${index}.socialMedia.linkedin`)}
                />
                
                <InputField
                  label="Twitter"
                  id={`Speakers.${index}.socialMedia.twitter`}
                  error={speakerErrors?.socialMedia?.twitter?.message}
                  {...control.register(`Speakers.${index}.socialMedia.twitter`)}
                />
                
                <InputField
                  label="Instagram"
                  id={`Speakers.${index}.socialMedia.instagram`}
                  error={speakerErrors?.socialMedia?.instagram?.message}
                  {...control.register(`Speakers.${index}.socialMedia.instagram`)}
                />
                
                <InputField
                  label="Personal Website"
                  id={`Speakers.${index}.socialMedia.personalWebsite`}
                  error={speakerErrors?.socialMedia?.personalWebsite?.message}
                  {...control.register(`Speakers.${index}.socialMedia.personalWebsite`)}
                />
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="mt-4">
        <Button
          variant="primary" 
          onClick={addSpeaker}
          className="w-full"
        >
          Add Speaker
        </Button>
      </div>
    </div>
  );
};

export default SpeakerForm;