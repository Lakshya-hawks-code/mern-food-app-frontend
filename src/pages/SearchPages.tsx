import { useParams } from "react-router-dom"
import {useSearchRestaurant} from "../api/SearchRestaurant";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultCard from "@/components/SearchResultCard";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useState } from "react";
import PaginationSelector from "@/components/PaginationSelector";
import CuisineFilter from "@/components/CuisineFilter";
import SortOptionDropdown from "@/components/SortOptionDropdown";


export type SearchState = 
{
    searchQuery:string,
    page:number,
    selectedCuisines: string[],
    sortOption : string
}

const SearchPages = () => 
    {
        const {city} = useParams()
        const [searchState,setSearchState] = useState<SearchState>({
            searchQuery : "",
            page:1,
            selectedCuisines: [],
            sortOption:"bestMatch"
        })
   
        const [isExpanded, setIsExpanded] = useState<boolean>(false);

        const {result,  isLoading} = useSearchRestaurant(searchState,city);

        
        if(isLoading)
            {
                return <span>Loading...</span>
            }

          if(!city)
            {
                return <span>No city provided in. please search a correct city</span>
            }
          
            if(!result?.data || result.data.length === 0)
                {
                    return <span>No result found in {city}</span>
                }

            
                const setSearchQuery = (searchFormData: SearchForm) => {
                    setSearchState((prevState) => ({
                        ...prevState,
                        searchQuery: searchFormData.searchQuery,
                        page:1
                    }));
                };

                const resetSearch = () => {
                    setSearchState((prevState) => ({
                        ...prevState,
                        searchQuery: "",
                        page:1
                    }));
                };

                const setPages = (page:number) =>
                    {
                        setSearchState((prevState)=>({
                            ...prevState,
                            page
                        }))
                    }

                    const setSelectedCuisines = (selectedCuisines: string[]) => {
                        setSearchState((prevState) => ({
                          ...prevState,
                          selectedCuisines,
                          page: 1,
                        }));
                      }; 

                      
                    const setSortingDetails = (sortOption : string) => {
                        setSearchState((prevState) => ({
                            ...prevState,
                            page:1,
                            sortOption
                        }))
                    }
        
        return (
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
             <div id="cuisines-list">
                <CuisineFilter
                  selectedCuisines = {searchState.selectedCuisines}
                  onChange={setSelectedCuisines}
                  isExpanded = {isExpanded}
                  onExpandedClick={() =>
                    setIsExpanded((prevIsExpanded) => !prevIsExpanded)
                  }
                />
             </div>
             <div id="main-content" className="flex flex-col">
                   <SearchBar
                    onSubmit={setSearchQuery}
                    searchQuery={searchState.searchQuery}
                    placeHolder="Search by Cuisine or Restaurant Name"
                    onReset={resetSearch}
                />
                  <div className="flex justify-between flex-col gap-3 lg:flex-row">
                 <SearchResultInfo total={result.pagination.total} city={city} />
                 <SortOptionDropdown
                    onChange = {setSortingDetails}
                    sortOption = {searchState.sortOption}
                 />
            </div>
                {
                    result.data.map((restaurnat) =>(
                        <SearchResultCard restaurant={restaurnat}/>
                    ))}
                    <PaginationSelector 
                    page={result.pagination.page} 
                    pages={result.pagination.pages}
                    onChangePage={setPages}
                    />
             </div>
          </div>
        ) 
    }
    export default SearchPages