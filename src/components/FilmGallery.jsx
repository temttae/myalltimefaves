export const FilmGallery = (props) => {
  const { films, posters } = props;

  if (films.length == 0)
    return (
      <p className="text-center italic">No films from this decade yet!</p>
    )

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {films.map(film => {
        return (
          <a href={`/film/${film.data[0].slug}`} key={film.id}>
            <div className="text-center">
              <div className="mb-4">
                <img src={posters[film.data[0].slug].src} className="w-full h-auto object-contain block" />
              </div>
              <a>{film.data[0].title} ({film.data[0].year})</a>
            </div>
          </a>
        )
      })}
    </div>
  )
}
