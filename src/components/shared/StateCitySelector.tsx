'use client'

import { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatesAndCities } from '@/lib/statesAndCities'

interface StateCitySelectorProps {
  city: string
  setCity: (city: string) => void
}

export default function StateCitySelector({ city, setCity }: StateCitySelectorProps) {
  const [targetType, setTargetType] = useState<'All India' | 'State' | 'City' | ''>('')
  const [state, setState] = useState('')
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    if (targetType === 'All India') {
      setCity('All India')
      setState('')
      setCities([])
    } else if (targetType === 'State') {
      setCity(state || '')
    } else if (targetType === 'City' && state) {
      // @ts-ignore
      setCities(StatesAndCities[state] || [])
    }
  }, [targetType, state])

  const handleCityChange = (cityName: string) => {
    setCity(cityName)
  }

  return (
    <div className="space-y-5 w-full">
      {/* Target Type Selector */}
      <div>
        <Label className="mb-2 block">Target Location Type</Label>
        <Select value={targetType} onValueChange={(val: any) => setTargetType(val)}>
          <SelectTrigger className="w-full bg-background border-input focus:ring-2 focus:ring-ring">
            <SelectValue placeholder="Select target type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All India">All India</SelectItem>
            <SelectItem value="State">State or Region</SelectItem>
            <SelectItem value="City">City </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* State Selector */}
      {targetType !== 'All India' && (
        <div>
          <Label className="mb-2 block" htmlFor="state">
            State
          </Label>
          <Select
            value={state}
            onValueChange={(val) => {
              setState(val)
              if (targetType === 'State') setCity(val)
            }}
          >
            <SelectTrigger className="w-full bg-background border-input focus:ring-2 focus:ring-ring">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(StatesAndCities).map((stateName) => (
                <SelectItem key={stateName} value={stateName}>
                  {stateName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* City Selector */}
      {targetType === 'City' && state && (
        <div>
          <Label className="mb-2 block" htmlFor="city">
            City
          </Label>
          <Select value={city} onValueChange={handleCityChange}>
            <SelectTrigger className="w-full bg-background border-input focus:ring-2 focus:ring-ring">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((cityName, i) => (
                <SelectItem key={i} value={cityName}>
                  {cityName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}
