import { useState } from "react";
import { X, Calendar, MapPin } from "lucide-react";

interface Memory {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  location?: string;
}

const memories: Memory[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    title: "College Fest 2024",
    description: "An unforgettable cultural event with friends and amazing performances.",
    date: "March 2024",
    location: "University Campus",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    title: "Hackathon Victory",
    description: "24 hours of coding, teamwork, and innovation that led to our first win!",
    date: "January 2024",
    location: "Tech Hub",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    title: "Team Outing",
    description: "A refreshing break with the project team after a successful product launch.",
    date: "December 2023",
    location: "Hill Station",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    title: "Workshop Day",
    description: "Learning new technologies and sharing knowledge with fellow developers.",
    date: "November 2023",
    location: "Conference Hall",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
    title: "Graduation Prep",
    description: "Final year memories with classmates before stepping into the real world.",
    date: "October 2023",
    location: "University",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop",
    title: "Tech Conference",
    description: "Attending industry talks and networking with professionals.",
    date: "September 2023",
    location: "Convention Center",
  },
];

const Gallery = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <section id="gallery" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            My <span className="text-gradient">Memories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Moments that shaped my journey and adventures along the way
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className="group relative overflow-hidden rounded-xl glass cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(160_84%_39%/0.3)]"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedMemory(memory)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-lg font-bold font-heading text-foreground">{memory.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>{memory.date}</span>
                </div>
              </div>
              
              {/* Always visible caption on mobile */}
              <div className="p-4 md:hidden">
                <h3 className="text-lg font-bold font-heading">{memory.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{memory.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMemory && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            className="relative max-w-4xl w-full glass rounded-2xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="md:flex">
              <div className="md:w-2/3">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-1/3 flex flex-col justify-center">
                <h3 className="text-2xl font-bold font-heading text-gradient mb-3">
                  {selectedMemory.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {selectedMemory.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{selectedMemory.date}</span>
                  </div>
                  {selectedMemory.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{selectedMemory.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
