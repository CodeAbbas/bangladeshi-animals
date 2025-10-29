import {
  Leaf,
  Bird,
  Fish,
  Bug,
  Turtle,
  PawPrint
} from 'lucide-react';

// Categories for homepage
export const categories = [
  { name: "Mammals", icon: PawPrint, href: "#", color: "text-brown-600", category: "Mammal" },
  { name: "Birds", icon: Bird, href: "#", color: "text-brown-600", category: "Bird" },
  { name: "Reptiles", icon: Turtle, href: "#", color: "text-brown-600", category: "Reptile" },
  { name: "Amphibians", icon: Leaf, href: "#", color: "text-brown-600", category: "Amphibian" },
  { name: "Fish", icon: Fish, href: "#", color: "text-brown-600", category: "Fish" },
  { name: "Invertebrates", icon: Bug, href: "#", color: "text-brown-600", category: "Invertebrate" },
];

// blog posts
export const blogPosts = [
  { id: 1, title: "The Sundarbans: A Tiger's Kingdom", date: "Oct 20, 2025", excerpt: "Exploring the dense mangrove forests that the Royal Bengal Tiger calls home..." },
  { id: 2, title: "The Hilsa's Great Journey Upstream", date: "Oct 15, 2025", excerpt: "Understanding the migration patterns of Bangladesh's national fish..." },
  { id: 3, title: "Vulture Conservation: A Race Against Time", date: "Oct 10, 2025", excerpt: "The story of the 'Shokun' and the efforts to save it from extinction..." },
];