/** @jsxImportSource @emotion/react */
import Icon from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Checkbox, ConfigProvider, Table } from 'antd';
import { ReactComponent as IconLoading } from 'assets/icon_loading.svg';
import { debounce } from 'lodash';
import { memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
/**
 * @des Custom Table
 * @param {Array<object>} data
 * @param {Array<object>} columns
 * @param {function} onRow
 * @param {string} keyName='Id'
 * @param {boolean} loading=false
 * @param {Array<string|number>} selectedRowKeys=[]
 * @param {function} onTableSelectChange=null
 * @param {function} fetchNextPage=()=>{}
 * @param {boolean} hasNextPage=false
 * @param {boolean} showSelect=false
 * @param {function} hoverItemFn=null
 * @param {boolean} sticky=false
 * @returns {JSX.Element}
 */
const CusTable = memo(
  ({
    data,
    columns,
    onRow,
    keyName = 'Id',
    loading = false,
    selectedRowKeys = [],
    onTableSelectChange = null,
    fetchNextPage = () => {},
    hasNextPage = false,
    showSelect = false,
    hoverItemFn = null,
    sticky = false,
  }) => {
    const dispatch = useDispatch();
    const containerRef = useRef(null);

    const handleScroll = useCallback(
      (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight && hasNextPage) {
          fetchNextPage();
        }
      },
      [fetchNextPage, hasNextPage]
    );

    const onDebounceScroll = debounce(handleScroll, 300);
    useEffect(() => {
      const scrollContainer = containerRef.current;
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', onDebounceScroll);
      }
      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', onDebounceScroll);
        }
      };
    }, [onDebounceScroll]);

    const rowSelection = {
      selectedRowKeys,
      onChange: onTableSelectChange,
      columnWidth: 75,
      fixed: true,
      columnTitle: () => {
        const totalRows = data?.length;
        const selectedRows = selectedRowKeys.length;
        const isIndeterminate = selectedRows > 0 && selectedRows < totalRows;
        const isChecked = selectedRows === totalRows && totalRows > 0;
        return (
          <StCenterBox
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              onCheckAll();
            }}
          >
            <StyledCheckbox
              indeterminate={isIndeterminate}
              checked={isChecked}
            />
          </StCenterBox>
        );
      },
      renderCell: (checked, record, index, originEle) => {
        return (
          <StCenterBox
            onClick={(e) => {
              e.stopPropagation();
              originEle.props.onChange(e);
            }}
            style={{ cursor: 'pointer' }}
          >
            <StyledCheckbox checked={checked} />
          </StCenterBox>
        );
      },
    };

    const onRowselection = showSelect ? rowSelection : null;

    const onCheckAll = () => {
      if (selectedRowKeys.length < data.length) {
        // 沒有或部分選中，全選
        const allKeys = data.map((row) => row[keyName]);
        onTableSelectChange(allKeys, data);
      } else {
        // 全選，取消全選
        onTableSelectChange([], []);
      }
    };
    const rowClass = (record) => {
      return record?.SendBackDate
        ? 'redBg'
        : record?.ProgName
        ? 'yellowBg'
        : '';
    };

    const onTableRow = (record, index) => {
      return {
        className: rowClass(record),
        onClick: (event) => {
          onRow(record);
        },
        onMouseEnter: (event) => {
          !!hoverItemFn && dispatch(hoverItemFn(record));
          // console.log('onMouseEnter', record);
        },
        onMouseLeave: (event) => {
          !!hoverItemFn && dispatch(hoverItemFn(null));
        },
      };
    };

    const FootLoading = () => {
      return <Icon component={IconLoading} style={{ fontSize: 34 }} />;
    };

    return (
      <StyleContain ref={containerRef}>
        {!loading && !data?.length ? null : (
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  // bodySortBg: 'var(--grey-00)',
                  headerBg: 'white',
                  headerColor: 'var(--grey-50)',
                  cellFontSize: '14px',
                  cellPaddingInlineSM: '16px',
                  cellPaddingBlockSM: '10px',
                  // rowSelectedBg: 'var(--blue-lightest)',
                  rowHoverBg: 'var(--grey-10)',
                  headerSortHoverBg: 'var(--grey-00)',
                  headerSortActiveBg: 'var(--grey-00)',
                },
              },
            }}
          >
            <Table
              size="small"
              css={cssTable(sticky)}
              showSorterTooltip={false}
              sortDirections={['ascend', 'descend', 'ascend']}
              rowSelection={onRowselection}
              locale={{
                emptyText: ' ',
              }}
              // loading={{
              //   spinning: loading,
              //   indicator: <CusSpin loading={loading} />,
              // }}
              loading={loading}
              rowKey={(record) => record[keyName]}
              columns={columns}
              dataSource={data}
              pagination={false}
              onRow={onTableRow}
              scroll
              // sticky={sticky}
              footer={hasNextPage ? <FootLoading /> : null}
            />
          </ConfigProvider>
        )}
      </StyleContain>
    );
  }
);

export { CusTable };

const cssTable = (sticky) => css`
  .ant-spin-nested-loading {
    > div:not(.ant-spin-container) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .ant-table-thead {
    > tr {
      position: ${sticky ? 'sticky' : 'relative'};
      top: ${sticky ? '0' : 'auto'};
      z-index: 10;
      height: 45px;
      > th {
        ::before {
          content: none !important;
        }
        :hover {
          background-color: var(--grey-00) !important;
        }
        font-size: 12px !important;
        border-bottom: none !important;
      }
    }
  }

  .ant-table-tbody {
    tr {
      height: 39px;
      cursor: pointer;
      td {
        border-bottom: none !important;
      }
    }
  }
  .ant-table-footer {
    background-color: var(--grey-00);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyleContain = styled.div`
  width: auto;
  height: 100%;
  overflow-y: auto;
  border-radius: var(--border-radius);
`;

const StyledCheckbox = styled(Checkbox)`
  width: 16px;
  height: 16px;
  cursor: 'pointer';
  border-radius: 4px;
`;
const StCenterBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
