'use client'

import { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StatesAndCities } from '@/lib/statesAndCities'

interface CitySelectorProps {
  city: string
  setCity: (city: string) => void
}

export default function CitySelector({ city, setCity }: CitySelectorProps) {
  const [targetType, setTargetType] = useState<'All India' | 'State' | 'City' | ''>('')
  const [state, setState] = useState('')
  const [cities, setCities] = useState<string[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (targetType === 'All India') {
      setCity('All India')
      setState('')
      setCities([])
    } else if (targetType === 'State') {
      setCity(state || '')
      setCities([])
    } else if (targetType === 'City' && state) {
      // @ts-ignore
      const cityList = StatesAndCities[state] || []
      setCities(cityList)
    }
  }, [targetType, state])

  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  )

  const handleCityChange = (cityName: string) => {
    setCity(cityName)
  }

  return (
    <div className="space-y-5 w-full">
      {/* Target Type */}
      <div>
        <Label className="mb-2 block">Target Location</Label>
        <Select value={targetType} onValueChange={(val: any) => setTargetType(val)}>
          <SelectTrigger className="w-full bg-background border-input focus:ring-2 focus:ring-ring ">
            <SelectValue placeholder="Select target type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All India">All India</SelectItem>
            <SelectItem value="State">State</SelectItem>
            <SelectItem value="City">City</SelectItem>
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
            <SelectContent className="w-full">
              {/* Search input */}
              <input
                type="text"
                placeholder="Search city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border-b border-border focus:outline-none"
              />
              {/* City list */}
              {filteredCities.map((cityName, i) => (
                <SelectItem key={i} value={cityName}>
                  {cityName}
                </SelectItem>
              ))}
              {filteredCities.length === 0 && (
                <p className="p-3 text-sm text-muted-foreground">No cities found</p>
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}
