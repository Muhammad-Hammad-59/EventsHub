import { useFieldArray } from 'react-hook-form';
import InputField from './fromComponent/InputField';
import TextareaField from './fromComponent/TextareaField';
import Button from './fromComponent/Button';
 
 

const AgendaForm = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "agenda"
  });

  const addAgendaItem = () => {
    append({
      sessionName: '',
      date: '',
      starttime: '',
      endtime: '',
      duration: '',
      sessiondetail: ''
    });
  };

  return (
    <div>
      {fields.length === 0 && (
        <p className="text-gray-500 text-center py-4">No agenda items added yet.</p>
      )}
      
      {fields.map((field, index) => {
        const agendaErrors = errors?.agenda?.[index];
        
        return (
          <div 
            key={field.id} 
            className="bg-gray-50 p-5 rounded-md mb-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Agenda Item {index + 1}</h3>
              <Button
                variant="danger" 
                onClick={() => remove(index)}
                className="text-xs px-2 py-1"
              >
                Remove
              </Button>
            </div>
            
            <InputField
              label="Session Name"
              id={`agenda.${index}.sessionName`}
              error={agendaErrors?.sessionName?.message}
              required
              {...control.register(`agenda.${index}.sessionName`, { 
                required: 'Session name is required' 
              })}
            />
            
            <InputField
              label="Date"
              id={`agenda.${index}.date`}
              type="date"
              error={agendaErrors?.date?.message}
              required
              {...control.register(`agenda.${index}.date`, { 
                required: 'Date is required' 
              })}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Start Time"
                id={`agenda.${index}.starttime`}
                type="time"
                error={agendaErrors?.starttime?.message}
                required
                {...control.register(`agenda.${index}.starttime`, { 
                  required: 'Start time is required' 
                })}
              />
              
              <InputField
                label="End Time"
                id={`agenda.${index}.endtime`}
                type="time"
                error={agendaErrors?.endtime?.message}
                required
                {...control.register(`agenda.${index}.endtime`, { 
                  required: 'End time is required' 
                })}
              />
            </div>
            
            <InputField
              label="Duration"
              id={`agenda.${index}.duration`}
              placeholder="e.g. 45 minutes"
              error={agendaErrors?.duration?.message}
              required
              {...control.register(`agenda.${index}.duration`, { 
                required: 'Duration is required' 
              })}
            />
            
            <TextareaField
              label="Session Details"
              id={`agenda.${index}.sessiondetail`}
              error={agendaErrors?.sessiondetail?.message}
              {...control.register(`agenda.${index}.sessiondetail`)}
            />
          </div>
        );
      })}
      
      <div className="mt-4">
        <Button 
          variant="primary" 
          onClick={addAgendaItem}
          className="w-full"
        >
          Add Agenda Item
        </Button>
      </div>
    </div>
  );
};

export default AgendaForm;