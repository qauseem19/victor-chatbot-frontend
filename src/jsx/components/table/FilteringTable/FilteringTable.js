import React,{ useMemo } from 'react';
import {format} from 'date-fns';
import PageTitle from "../../../layouts/PageTitle";
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA_2.json';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter'; 
//import './table.css';
import './filtering.css';


export const FilteringTable = () => {
	const COLUMNSTOShow = [
		{
			Header: 'Id',
			Footer: 'Id',
			accessor: 'id',
		},
		{
			Header: 'First Name',
			Footer: 'First Name',
			accessor: 'first_name',
		},
		{
			Header: 'Last Name',
			Footer: 'Last Name',
			accessor: 'last_name',
		},
		{
			Header: 'Email Id',
			Footer: 'Email Id',
			accessor: 'email',
		},
		{
			Header: 'Date of Birth',
			Footer: 'Date of Birth',
			accessor: 'date_of_birth',
			Cell: ({ value }) => { return format(new Date(value), 'dd/mm/yyyy') },
		},
		{
			Header: 'Country',
			Footer: 'Country',
			accessor: 'country',
		},
		{
			Header: 'Phone',
			Footer: 'Phone',
			accessor: 'phone',
		},
		// Add the Actions column
		{
			Header: 'Actions',
			Footer: 'Actions',
			id: 'actions',
			// Cell: ({ row }) => (
			// 	<div className="d-flex">
			// 	<Link
			// 	  href="#"
			// 	  className="btn btn-primary shadow btn-xs sharp me-1"
			// 	  onClick={() => handleEdit(row.original)}
			// 	>
			// 	  <i class="fa-regular fa-pen-to-square"></i>
			// 	</Link>
			// 	<Link
			// 	  href="#"
			// 	  className="btn btn-danger shadow btn-xs sharp"
			// 	  onClick={() => handleDelete(row.original)}
			// 	>
			// 	 <i class="far fa-trash-alt"></i>
			// 	</Link>
			//   </div>
			// ),
		},
	];
	const data = useMemo( () => MOCK_DATA, [window.location.pathname] )
	const columns = useMemo( () => COLUMNSTOShow, [] )
	const tableInstance = useTable({
		columns	,
		data,	
		initialState : {pageIndex : 0}
	}, useFilters, useGlobalFilter, usePagination)
	
	const { 
		getTableProps, 
		getTableBodyProps, 
		headerGroups, 
		prepareRow,
		state,
		page,
		gotoPage,
		pageCount,
		pageOptions,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setGlobalFilter,
	} = tableInstance
	
	
	const {globalFilter, pageIndex} = state
	
	
	return(
		<>
			<PageTitle activeMenu="Users" motherMenu="Home" />
			<div className="card">
				<div className="card-body">
					<div className="table-responsive">
						<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} heading={"User List"} />
						<table {...getTableProps()} className="table  display">
							<thead>
							   {headerGroups.map(headerGroup => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map(column => (
											<th {...column.getHeaderProps()}>
												{column.render('Header')}
												{/* {column.canFilter ? column.render('Filter') : null} */}
											</th>
										))}
									</tr>
							   ))}
							</thead> 
							<tbody {...getTableBodyProps()} className="" >
							
								{page.map((row) => {
									prepareRow(row)
									return(
										<tr {...row.getRowProps()}>
											{row.cells.map((cell) => {
												return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
											})}
										</tr>
									)
								})}
							</tbody>
						</table>
						<div className="d-flex justify-content-between">
							<span>
								Page{' '}
								<strong>
									{pageIndex + 1} of {pageOptions.length}
								</strong>{''}
							</span>
							<span className="table-index">
								Go to page : {' '}
								<input type="number" 
									className="ms-2"
									defaultValue={pageIndex + 1} 
									onChange = {e => { 
										const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0 
										gotoPage(pageNumber)
									} } 
								/>
							</span>
						</div>
						<div className="text-center">	
							<div className="filter-pagination  mt-3">
								<button className=" previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
								
								<button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
									Previous
								</button>
								<button className="next-button" onClick={() => nextPage()} disabled={!canNextPage}>
									Next
								</button>
								<button className=" next-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
	
}
export default FilteringTable;