export interface MovieResults {
  results: Movie[];
}

export interface Movie {
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  overview: string;
}

export interface MovieFilter {
  rating_lte: number;
  rating_gte: number;
}

// {"genres":[{"id":28,"name":"Action"},
// {"id":12,"name":"Adventure"},
// {"id":16,"name":"Animation"},
// {"id":35,"name":"Comedy"},
// {"id":80,"name":"Crime"},
// {"id":99,"name":"Documentary"},
// {"id":18,"name":"Drama"},
// {"id":10751,"name":"Family"},
// {"id":14,"name":"Fantasy"},
// {"id":36,"name":"History"},
// {"id":27,"name":"Horror"},
// {"id":10402,"name":"Music"},
// {"id":9648,"name":"Mystery"},
// {"id":10749,"name":"Romance"},
// {"id":878,"name":"Science Fiction"},
// {"id":10770,"name":"TV Movie"},
// {"id":53,"name":"Thriller"},
// {"id":10752,"name":"War"},
// {"id":37,"name":"Western"}]}

//added overview for details - not sure if this is where it needs to go
