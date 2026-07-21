              <Image
                src={Array.isArray(community.image) ? community.image[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" : community.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80"}
                alt={community.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />