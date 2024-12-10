import {format} from 'date-fns';
import { ColumnFilter } from './ColumnFilter';
import { Link } from 'react-router-dom';
export const COLUMNS = [
	{
		Header: 'Id',
		Footer: 'Id',
		accessor: 'id',
		Filter: ColumnFilter,
	},
	{
		Header: 'First Name',
		Footer: 'First Name',
		accessor: 'first_name',
		Filter: ColumnFilter,
	},
	{
		Header: 'Last Name',
		Footer: 'Last Name',
		accessor: 'last_name',
		Filter: ColumnFilter,
	},
	{
		Header: 'Email Id',
		Footer: 'Email Id',
		accessor: 'email',
		Filter: ColumnFilter,
	},
	{
		Header: 'Date of Birth',
		Footer: 'Date of Birth',
		accessor: 'date_of_birth',
		Cell: ({ value }) => { return format(new Date(value), 'dd/mm/yyyy') },
		Filter: ColumnFilter,
	},
	{
		Header: 'Country',
		Footer: 'Country',
		accessor: 'country',
		Filter: ColumnFilter,
	},
	{
		Header: 'Phone',
		Footer: 'Phone',
		accessor: 'phone',
		Filter: ColumnFilter,
	},
	// Add the Actions column
	{
		Header: 'Actions',
		Footer: 'Actions',
		id: 'actions',
		Cell: ({ row }) => (
			<div className="d-flex">
			<Link
			  href="#"
			  className="btn btn-primary shadow btn-xs sharp me-1"
			  onClick={() => handleEdit(row.original)}
			>
			  <i class="fa-regular fa-pen-to-square"></i>
			</Link>
			<Link
			  href="#"
			  className="btn btn-danger shadow btn-xs sharp"
			  onClick={() => handleDelete(row.original)}
			>
			 <i class="far fa-trash-alt"></i>
			</Link>
		  </div>
		),
	},
];

// Handle Edit and Delete actions
const handleEdit = (rowData) => {
	console.log("Edit row data:", rowData); // Implement your edit logic here
};

const handleDelete = (rowData) => {
	console.log("Delete row data:", rowData); // Implement your delete logic here
};

export const GROUPED_COLUMNS = [
	{
		Header : 'Id',
		Footer : 'Id',
		accessor: 'id'
	},
	{
		Header : 'Name',
		Footer : 'Name',
		columns: [
			{
				Header : 'First Name',
				Footer : 'First Name',
				accessor: 'first_name'
			},
			{
				Header : 'Last Name',
				Footer : 'Last Name',
				accessor: 'last_name'
			},
		]
	},
	{
		Header: 'Info',
		Footer: 'Info',
		columns: [
			{
				Header : 'Date of  Birth',
				Footer : 'Date of  Birth',
				accessor: 'date_of_birth'
			},
			{
				Header : 'Country',
				Footer : 'Country',
				accessor: 'country',
			},
			{
				Header : 'Phone',
				Footer : 'Phone',
				accessor: 'phone'
			},
		]
	},
]