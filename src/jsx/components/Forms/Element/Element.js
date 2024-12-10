import React, { Fragment } from "react";
import { Formik, Field, Form } from "formik";
import PageTitle from "../../../layouts/PageTitle";
import { Button, Accordion } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

const Element = () => {
  const formFieldNames = [
    "Subscription Name",
    "Last Name",
    "Subscription Type",
    "Other Field",
    "Features"
  ];

  const columns = React.useMemo(
    () => [
      {
        Header: formFieldNames[0],
        accessor: "col1",
      },
      {
        Header: formFieldNames[1],
        accessor: "col2",
      },
      {
        Header: formFieldNames[2],
        accessor: "col3",
      },
      {
        Header: formFieldNames[3],
        accessor: "col4",
      },
      {
        Header: formFieldNames[4],
        accessor: "col5",
      },
      {
         Header: 'Actions',
         Footer: 'Actions',
         id: 'actions',
         Cell: ({ row }) => (
            <div className="d-flex">
            <Link
              href="#"
              className="btn btn-primary shadow btn-xs sharp me-1"
            //   onClick={() => handleEdit(row.original)}
            >
              <i class="fa-regular fa-pen-to-square"></i>
            </Link>
            <Link
              href="#"
              className="btn btn-danger shadow btn-xs sharp"
            //   onClick={() => handleDelete(row.original)}
            >
             <i class="far fa-trash-alt"></i>
            </Link>
           </div>
         ),
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        col1: "Subscription 1",
        col2: "Doe",
        col3: "Premium",
        col4: "Option 1",
        col5: "Feature 1",
        actions: "",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <Fragment>
      <PageTitle activeMenu="Subscription" motherMenu="Home" pageContent="Subscription" />
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center mb-3 w-100">
                <h4 className="mb-0">{"Subscription"}</h4>
                <div className="d-flex">
                  <Button variant="primary">+ Add Subscription</Button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <Formik
                  initialValues={{
                    textField: "",
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  <Form>
                    <div className="row">
                      <div className="col-sm-3">
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="Subscription Name"
                          name="subscriptionName"
                        />
                      </div>
                      <div className="col-sm-3 mt-2 mt-sm-0">
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          name="lastName"
                        />
                      </div>
                      <div className="col-sm-3 mt-2 mt-sm-0">
                        <div className="form-group">
                          <Field
                            as="select"
                            className="form-control"
                            name="subscriptionType"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </Field>
                        </div>
                      </div>
                      <div className="col-sm-3 mt-2 mt-sm-0">
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="Other Field"
                          name="otherField"
                        />
                      </div>
                      <div className="col-sm-12 mt-2 mt-sm-0">
                        <Field
                          as="textarea"
                          className="form-control"
                          placeholder="Subscription Features"
                          name="features"
                        />
                      </div>
                    </div>
                  </Form>
                </Formik>
                <div className="d-flex mt-4 justify-content-center">
                  <Button variant="primary">Add Subscription</Button>
                </div>
                <div className="accordion-section mt-4">
                  <Accordion defaultActiveKey="0">
                    {[1, 2, 3].map((i) => (
                      <Accordion.Item eventKey={`${i}`} key={i}>
                        <Accordion.Header className="custom-accordion-header">
                          <table {...getTableProps()} className="table table-striped">
                            <thead>
                              {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                  {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} className="custom-column-header">
                                      {column.render('Header')}
                                    </th>
                                  ))}
                                </tr>
                              ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                              {rows.map(row => {
                                prepareRow(row);
                                return (
                                  <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                      return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </Accordion.Header>
                        <Accordion.Body></Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Element;
