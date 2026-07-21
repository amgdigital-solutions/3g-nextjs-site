                      <Image
                        src={Array.isArray(c.image) ? c.image[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" : c.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"}
                        alt={c.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />