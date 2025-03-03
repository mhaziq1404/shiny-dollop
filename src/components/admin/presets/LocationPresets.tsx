import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { presetService } from '../../../services/presets';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Card } from '../../ui/Card';
import { toast } from 'react-hot-toast';
import { MapPinIcon, LinkIcon } from '@heroicons/react/24/outline';

interface LocationFormData {
  name: string;
  mapUrl: string;
}

export function LocationPresets() {
  const [formData, setFormData] = React.useState<LocationFormData>({
    name: '',
    mapUrl: ''
  });
  const queryClient = useQueryClient();

  const { data: locations } = useQuery(
    ['locationPresets'],
    presetService.getLocations
  );

  const addMutation = useMutation(
    (location: LocationFormData) => presetService.addLocation(location),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['locationPresets']);
        setFormData({ name: '', mapUrl: '' });
        toast.success('Location added');
      },
    }
  );

  const deleteMutation = useMutation(
    (id: string) => presetService.deleteLocation(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['locationPresets']);
        toast.success('Location removed');
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    addMutation.mutate(formData);
  };

  const isValidUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Card>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Location Presets</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                label="Location Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Add new location"
              />
            </div>
            <div className="flex-1">
              <Input
                label="Google Maps URL (optional)"
                value={formData.mapUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, mapUrl: e.target.value }))}
                placeholder="https://maps.google.com/..."
                error={!isValidUrl(formData.mapUrl) ? 'Invalid URL format' : undefined}
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={!formData.name.trim() || !isValidUrl(formData.mapUrl)}
          >
            Add Location
          </Button>
        </form>
        <div className="mt-4 space-y-2">
          {locations?.map((location) => (
            <div
              key={location.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded"
            >
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <span className="font-medium">{location.name}</span>
                {location.mapUrl && (
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
              <Button
                variant="secondary"
                onClick={() => deleteMutation.mutate(location.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}