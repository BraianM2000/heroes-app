import React, { useMemo } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
// import { heroes } from '../../data/heroes'
import { useForm } from '../../hooks/useForm'
import { HeroeCard } from '../heroes/HeroeCard'
import { getHeroesByName } from '../../selectors/getHeroesByName'

export const SearchScreen = ({ history }) => {

    const location = useLocation()
    const { q = '' } = queryString.parse(location.search)
    console.log(q)



    const [formValues, handleInptuChange] = useForm({
        searchText: q
    })

    const { searchText } = formValues


    const handleSearch = (e) => {
        e.preventDefault()
        history.push(`?q=${searchText}`)
    }
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q])

    return (
        <div>
            <h1>Search</h1>

            <div className="row">
                <div className="col-5">

                    <h4> Search form</h4>
                    <hr />

                    <form onSubmit={handleSearch}>

                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInptuChange}
                        />

                        <button type="submit" className="btn m-1 btn-block btn-outline-primary">
                            search
                        </button>

                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {(q === '')
                        &&
                        <div className="alert alert-info">
                            search a hero
                        </div>}

                        {(q !== '' && heroesFiltered.length === 0)
                        &&
                        <div className="alert alert-danger">
                            there is no a hero with {q}
                        </div>}

                    

                    {
                        heroesFiltered.map(heroe => (
                            <HeroeCard key={heroe.id}
                                {...heroe}
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
