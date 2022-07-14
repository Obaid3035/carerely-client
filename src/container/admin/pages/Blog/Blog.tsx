import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import Loader from "../../../../component/Loader/Loader";
import { NavLink } from "react-router-dom";
import Button from "../../../../component/Button/Button";
import { getAllBlog } from "../../../../services/api/admin/blog";
import { AiOutlineIssuesClose } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import './Blog.scss';

const Blog = () => {
  const navigation = useNavigate();
  const [size, setSize] = useState(3);


  const [page, setPage] = useState(0)
  const [data, setData] = useState<any>([]);
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    getAllBlog(page, size)
      .then((res) => {
        setData(res.data.blog)
        setCount(res.data.count)
        setIsLoading(false)
      })
  }, [page])


  const columns = [
    "ID",
    "Title",
    {
      name: "Edit Menu Type",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <button className={'action close_action'} onClick={() => navigation(`/admin/update/blog/${tableMeta.rowData[0]}`)}>
              <AiOutlineIssuesClose/>
            </button>
          )
        }
      },
    },
  ]
  const options: any = {
    filter: false,
    count: count,
    rowsPerPage: 3,
    serverSide: true,
    rowsPerPageOptions: [],
    jumpToPage: false,
    responsive: 'standard',
    page,
    onTableChange: (action: string, newTableState: any) => {
      switch (action) {
        case 'changePage':
          changePage(newTableState);
          break;
      }
    },
    textLabels: {
      body: {
        noMatch: isLoading ?
          (
            <Loader />
          )
          :
          'No Data Found'
      }
    },
  };

  const changePage = (newTableState: any) => {
    setPage(newTableState.page);
  }



  return (
    <div className={"page_responsive"}>
      <div className={'header'}>
        <h5>Blog</h5>
        <NavLink to={'/admin/create/blog'}>
          <Button className={'px-2 py-2 mb-3'}>+ Create New Blog</Button>
        </NavLink>
      </div>
      {
        !isLoading  ?
          (
            <MUIDataTable
              title={`Blog List`}
              data={data}
              columns={columns}
              options={options}
            />
          ) : (
            <div className="text-center">
              <Loader />
            </div>
          )
      }
    </div>
  );
};

export default Blog;
