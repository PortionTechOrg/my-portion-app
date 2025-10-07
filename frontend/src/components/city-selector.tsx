
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCityStore } from '@/zustand/store';

type CitySelectorProps = {
  cities: string[];
};

export function CitySelector({ cities }: CitySelectorProps) {
  const { city, setCity } = useCityStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(city);

  const handleSave = () => {
    setCity(selectedCity);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 text-xs cursor-pointer">
          <MapPin className="h-3 w-3" />
          <span className="text-muted-foreground">Showing products from:</span>
          <span className="font-medium text-sm text-foreground">{city}</span>
          <Button
            variant="link"
            className="p-0 text-sm h-auto font-medium"
          >
            Change
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose your location</DialogTitle>
          <DialogDescription>
            Select your city to see products available for delivery.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select onValueChange={setSelectedCity} defaultValue={selectedCity}>
            <SelectTrigger>
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((cityName) => (
                <SelectItem key={cityName} value={cityName}>
                  {cityName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSave}>Save changes</Button>
      </DialogContent>
    </Dialog>
  );
}
