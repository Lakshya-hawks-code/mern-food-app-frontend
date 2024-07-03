import {Pagination,PaginationContent,PaginationItem,PaginationPrevious,PaginationLink,PaginationNext   } from "@/components/ui/pagination"

type Props = 
{
    page:number,
    pages:number,
    onChangePage:(page:number) => void
}

const PaginationSelector = ({page,pages,onChangePage} : Props) =>
    {

        const pageArr = [];
        for(let i = 0; i < page; i++)
            {
                pageArr.push(i);        
            }
          return (
          <Pagination>
            <PaginationContent>
                {
                    page !== 1 && (
                        <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => onChangePage(page-1)}/>
                        </PaginationItem>
                    )}
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => onChangePage(page-1)}/>
              </PaginationItem>
              {
                pageArr.map((number) => (
                  <PaginationItem>
                    <PaginationLink
                     href="#"
                      onClick={() => onChangePage(number)}
                      isActive={page === number}
                      >
                        {number}
                      </PaginationLink>      
                  </PaginationItem>
                ))}
                {
                    page !== pageArr.length  && (
                        <PaginationItem>
                          <PaginationNext href="#" onClick={() => onChangePage(page+1)}/>
                        </PaginationItem>
                    )
                }
            </PaginationContent>
          </Pagination>
          )
    }

    export default PaginationSelector