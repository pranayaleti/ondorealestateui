"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface PropertyFiltersProps {
  onClose: () => void
}

export function PropertyFilters({ onClose }: PropertyFiltersProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Filter Properties</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Property Type</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All Types</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single-family" id="single-family" />
                <Label htmlFor="single-family">Single Family</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multi-family" id="multi-family" />
                <Label htmlFor="multi-family">Multi-Family</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="commercial" id="commercial" />
                <Label htmlFor="commercial">Commercial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vacation" id="vacation" />
                <Label htmlFor="vacation">Vacation</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="salt-lake-city">Salt Lake City, UT</SelectItem>
                  <SelectItem value="provo">Provo, UT</SelectItem>
                  <SelectItem value="ogden">Ogden, UT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="vacant">Vacant</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Monthly Income Range</Label>
              <span className="text-sm text-muted-foreground">$0 - $5,000+</span>
            </div>
            <Slider defaultValue={[0, 5000]} min={0} max={5000} step={100} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-income">Min ($)</Label>
              <Input id="min-income" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-income">Max ($)</Label>
              <Input id="max-income" type="number" placeholder="5000+" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset Filters</Button>
        <Button>Apply Filters</Button>
      </CardFooter>
    </Card>
  )
}
