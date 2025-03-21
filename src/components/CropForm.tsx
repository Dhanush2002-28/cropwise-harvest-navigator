
import { useState } from 'react';
import { Wheat } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CropFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  interestedCrops: string;
}

const CropForm = ({ onSubmit }: CropFormProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    interestedCrops: '',
  });

  const handleChange = (value: string) => {
    setFormData({ interestedCrops: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 card-shine">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Wheat className="w-5 h-5 mr-2 text-primary" />
        {t('crops.title')}
      </h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="interestedCrops" className="block text-sm font-medium">
            {t('crops.input')}
          </label>
          <input
            type="text"
            id="interestedCrops"
            value={formData.interestedCrops}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={t('crops.placeholder')}
            className="w-full p-3 bg-background border border-input rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
        >
          {t('crops.submit')}
        </button>
      </div>
    </form>
  );
};

export default CropForm;
