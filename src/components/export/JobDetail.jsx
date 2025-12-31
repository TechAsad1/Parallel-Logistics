import React, { useEffect } from 'react';
import { Button, Flex, Table, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { Link, useParams } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import jobImg from "../images/job.png";
import { getCargo, getCustomer, getGrossWeight, getJobType, getLoadingTerm, getNetWeight, getNoOfContainer, getPortOfDischarge, getPortOfLoading, getShippingLine, getVessel, jobById } from '../../redux/Action';
import { useDispatch, useSelector } from 'react-redux';

const { Meta } = Card;

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
          }
        }
      }
    `,
  };
});
const { Text } = Typography;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Borrow',
    dataIndex: 'borrow',
  },
  {
    title: 'Repayment',
    dataIndex: 'repayment',
  },
];
const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    borrow: 10,
    repayment: 33,
  },
  {
    key: '2',
    name: 'Jim Green',
    borrow: 100,
    repayment: 0,
  },
  {
    key: '3',
    name: 'Joe Black',
    borrow: 10,
    repayment: 10,
  },
  {
    key: '4',
    name: 'Jim Red',
    borrow: 75,
    repayment: 45,
  },
];
const fixedColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: true,
    width: 100,
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
];
const fixedDataSource = Array.from({ length: 20 }).map((_, i) => ({
  key: i,
  name: ['Light', 'Bamboo', 'Little'][i % 3],
  description: 'Everything that has a beginning, has an end.',
}));
const JobDetail = () => {
  const { id } = useParams();
  const { styles } = useStyle();
  const dispatch = useDispatch();

  const cargoDetailArrs = useSelector((state) => state.cargoDetailArr);
  const customerArrs = useSelector((state) => state.customerArr);
  const grossWeightArrs = useSelector((state) => state.grossWeightArr);
  const jobTypeArrs = useSelector((state) => state.jobTypeArr);
  const loadingTermArrs = useSelector((state) => state.loadingTermArr);
  const netWeightArrs = useSelector((state) => state.netWeightArr);
  const noOfContainerArrs = useSelector((state) => state.noOfContainerArr);
  const portOfDischargeArrs = useSelector((state) => state.portOfDischargeArr);
  const portOfLoadingArrs = useSelector((state) => state.portOfLoadingArr);
  const shippingLineArrs = useSelector((state) => state.shippingLineArr);
  const vesselArrs = useSelector((state) => state.vesselArr);
  const jobArrs = useSelector((state) => state.jobArr);

  useEffect(() => {
    dispatch(getCargo());
    dispatch(getCustomer());
    dispatch(getGrossWeight());
    dispatch(getNetWeight());
    dispatch(getNoOfContainer());
    dispatch(getPortOfLoading());
    dispatch(getPortOfDischarge());
    dispatch(getLoadingTerm());
    dispatch(getShippingLine());
    dispatch(getVessel());
    dispatch(getJobType());
  }, []);
  useEffect(() => {
    dispatch(jobById(id));
  }, [id]);

  return (
    <>
      <Content style={{ margin: '0 16px' }}>
        <div className="header d-flex justify-content-between align-items-center">
          <div>
            <h5>Jobs</h5>
            <Text type="secondary">Manage your records</Text>
          </div>
          <Link to="/newJob"><Button type="primary">Back To Jobs</Button></Link>
        </div>
        <div className="row">
          <div className="col-lg-9">
            {/* <Flex vertical gap="small">
              <Table
                className={styles.customTable}
                columns={fixedColumns}
                dataSource={fixedDataSource}
                pagination={false}
                bordered
                summary={() => (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>This is a summary content</Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                )}
              />
            </Flex> */}

            <table class="table table-bordered detailTB">
              {/* <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                </tr>
              </thead> */}
              <tbody>
                <tr>
                  <td>Date</td>
                  <td>{jobArrs.date}</td>
                </tr>
                <tr>
                  <td>CuttOfDate</td>
                  <td>{jobArrs.cuttOfDate}</td>
                </tr>
                <tr>
                  <td>CuttOfDateVessel</td>
                  <td>{jobArrs.cuttOfDateVessel}</td>
                </tr>
                <tr>
                  <td>Job Id</td>
                  <td>{jobArrs.id}</td>
                </tr>
                <tr>
                  <td>Job Type</td>
                  <td>{(() => { return jobTypeArrs.find(i => i.jobTypeId === jobArrs.jobTypeId)?.jobTypeDesc || ""; })()}</td>
                </tr>
                <tr>
                  <td>Cargo Detail</td>
                  <td>{(() => { return cargoDetailArrs.find(i => i.cargoId === jobArrs.cargoDetailId)?.cargoDetailDesc || ""; })()}</td>
                </tr>
                <tr>
                  <td>Customer Name</td>
                  <td>{(() => { return customerArrs.find(i => i.customerId === jobArrs.customerId)?.customerName || ""; })()}</td>
                </tr>
                <tr>
                  <td>Vessel</td>
                  <td>{jobArrs.vessel}</td>
                </tr>
                <tr>
                  <td>Shipping Line</td>
                  <td>{jobArrs.shippingLine}</td>
                </tr>
                <tr>
                  <td>Number Of Container</td>
                  <td>{jobArrs.numberOfContainer}</td>
                </tr>
                <tr>
                  <td>Net Weight</td>
                  <td>{jobArrs.netWeight}</td>
                </tr>
                <tr>
                  <td>Gross Weight</td>
                  <td>{jobArrs.grossWeight}</td>
                </tr>
                <tr>
                  <td>Port Of Loading</td>
                  <td>{jobArrs.portOfLoading}</td>
                </tr>
                <tr>
                  <td>Port Of Discharge</td>
                  <td>{jobArrs.portOfDischarge}</td>
                </tr>
                <tr>
                  <td>Loading Term</td>
                  <td>{jobArrs.loadingTerm}</td>
                </tr>
                <tr>
                  <td>Free Days At Pod</td>
                  <td>{jobArrs.freeDaysAtPod}</td>
                </tr>
                <tr>
                  <td>Transit Time Days</td>
                  <td>{jobArrs.transitTimeDays}</td>
                </tr>
                <tr>
                  <td>ETA POD</td>
                  <td>{jobArrs.etaPod}</td>
                </tr>
                <tr>
                  <td>ETD POL</td>
                  <td>{jobArrs.etdPol}</td>
                </tr>
                <tr>
                  <td>Comment</td>
                  <td>{jobArrs.comment}</td>
                </tr>
              </tbody>
            </table>

          </div>
          <div className="col-lg-3 d-flex justify-content-center">
            <Card
              style={{ width: 300, height: 420 }}
              cover={
                <img
                  alt="example"
                  src={jobImg}
                  style={{ height: 270 }}
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title="Sibtain Ali"
                description="This is the description"
              />
            </Card>
          </div>
        </div>
      </Content>
    </>
  );
};
export default JobDetail;