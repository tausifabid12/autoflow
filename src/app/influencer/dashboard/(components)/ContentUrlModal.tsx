import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ContentUrlModal() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState([
    { id: 1, contentType: '', url: '' }
  ]);

  const addEntry = () => {
    const newId = Math.max(...entries.map(e => e.id), 0) + 1;
    setEntries([...entries, { id: newId, contentType: '', url: '' }]);
  };

  const removeEntry = (id: any) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

   //@ts-ignore
  const updateEntry = (id, field, value) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleSubmit = () => {
    console.log('Submitted entries:', entries);
    setOpen(false);
  };

  return (
   
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="shadow-lg">
            Submit Work
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto border border-border">
          <DialogHeader>
            <DialogTitle>Add Content Types & URLs</DialogTitle>
            <DialogDescription>
              Add one or more content types with their corresponding URLs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {entries.map((entry, index) => (
              <div key={entry.id} className="p-4 bg-card border-border rounded-lg  space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium ">
                    Entry {index + 1}
                  </span>
                  {entries.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEntry(entry.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 "
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`contentType-${entry.id}`}>
                    Content Type
                  </Label>
                  <Input
                    id={`contentType-${entry.id}`}
                    placeholder="e.g., reels, shorts, long video , post"
                    value={entry.contentType}
                    onChange={(e) => updateEntry(entry.id, 'contentType', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`url-${entry.id}`}>
                    URL
                  </Label>
                  <Input
                    id={`url-${entry.id}`}
                    placeholder="https://example.com"
                    value={entry.url}
                    onChange={(e) => updateEntry(entry.id, 'url', e.target.value)}
                  />
                </div>
              </div>
            ))}
            
            <Button
              variant="outline"
              onClick={addEntry}
              className="w-full border-dashed"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Entry
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
 
  );
}