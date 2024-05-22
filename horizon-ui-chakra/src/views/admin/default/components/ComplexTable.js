import React, { useEffect, useMemo, useState } from "react";
import {
  Flex,
  Table,
  IconButton,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
} from "@chakra-ui/react";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { MdCheckCircle, MdCancel, MdOutlineError, MdThumbUp } from "react-icons/md";
import axios from 'axios';
import Cookies from 'js-cookie';

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

export default function ColumnsTable() {
  const [tableData, setTableData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch sellers data from API
    axios.get('http://localhost:8080/getSellers')
      .then(response => {
        setTableData(response.data.users);
      })
      .catch(error => {
        console.error("There was an error fetching the sellers!", error);
      });
  }, []);

  const columnsData = useMemo(() => [
    { Header: "NAME", accessor: "user_name" },
    { Header: "Email", accessor: "user_email" },
    { Header: "Record", accessor: "Commercial_Record" },
    { Header: "Approved", accessor: "is_deleted" },
    { Header: "Actions", accessor: "actions" }
  ], []);

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const handleApprove = (id) => {
    // API call to approve seller
        const token = Cookies.get('AdminAccessToken');
        axios.put(`http://localhost:8080/sellerAccept/${id}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
        // Update the table data after approval
        setTableData(prevData => 
            prevData.map(seller => 
            seller._id === id ? { ...seller, is_deleted: false } : seller
            )
        );
        })
        .catch(error => {
        console.error("There was an error approving the seller!", error);
        });
  };

  const handleShowImage = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <Card direction='column' w='100%' px='0px' overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='10px' align='center'>
        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
          Sellers
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())} pe='10px' key={index} borderColor={borderColor}>
                  <Flex justify='space-between' align='center' fontSize={{ sm: "10px", lg: "12px" }} color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "NAME") {
                    data = <Text color={textColor} fontSize='sm' fontWeight='700'>{cell.value}</Text>;
                  } else if (cell.column.Header === "Approved") {
                    data = (
                      <Flex align='center'>
                        <Icon
                          w='24px'
                          h='24px'
                          me='5px'
                          color={
                            cell.value === false ? "green.500" :
                            cell.value === true ? "red.500" :
                            cell.value === null ? "orange.500" : null
                          }
                          as={
                            cell.value === false ? MdCheckCircle :
                            cell.value === true ? MdCancel :
                            cell.value === null ? MdOutlineError : null
                          }
                        />
                        <Text color={textColor} fontSize='sm' fontWeight='700'>{cell.value}</Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Record") {
                    data = (
                      <Button onClick={() => handleShowImage(cell.value)} colorScheme="teal" size="sm">
                        View Record
                      </Button>
                    );
                  } else if (cell.column.Header === "Actions") {
                    data = (
                      <Flex justify='center'>
                        <IconButton
                          aria-label="Approve Seller"
                          icon={<MdThumbUp />}
                          colorScheme="teal"
                          onClick={() => handleApprove(row.original._id)}
                        />
                      </Flex>
                    );
                  } else {
                    data = <Text color={textColor} fontSize='sm' fontWeight='700'>{cell.value}</Text>;
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH='30px !important'
                      py='8px'
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Commercial Record</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Image src={selectedImage} alt="Commercial Record" /> */}
            <img src={selectedImage} alt="Commercial Record" ></img>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
}
