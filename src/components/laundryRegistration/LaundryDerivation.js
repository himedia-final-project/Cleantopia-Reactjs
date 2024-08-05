import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import './LaundryDerivation.css';
import { fetchLaundrySelect } from '../../apis/LandryAPICall';
import axios from 'axios';

const ItemType = {
    ROW: 'row'
};

function LaundryDerivation() {
    const dispatch = useDispatch();
    const branch = useSelector(state => state.getBranchReducer);
    const branchCode = branch && branch.branchCode;
    const selectLandry = useSelector(state => state.selectLaundry.waterSupply);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        if (branchCode) {
            dispatch(fetchLaundrySelect(branchCode));
        } else {
            console.error('Branch data or branchCode is not available');
        }
    }, [dispatch, branchCode]);

    const filteredLaundry = selectLandry.filter(item => 
        item.laundryWashingInstructionStatus === 'N' &&
        item.laundryCollectionStatus === 'Y' &&
        item.laundryArriveStatus === 'Y'
    );

    const handleDrop = (item) => {
        setSelectedItems(prev => {
            if (!prev.find(i => i.laundryCode === item.laundryCode)) {
                return [...prev, item];
            }
            return prev;
        });
    };

    const handleRemove = (item) => {
        setSelectedItems(prev => prev.filter(i => i.laundryCode !== item.laundryCode));
    };

    const [{ isOver }, drop] = useDrop({
        accept: ItemType.ROW,
        drop: (item) => handleDrop(item),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const handleSubmit = async () => {
        const url = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/registration/registLaundryWay`; // 엔드포인트 URL을 입력하세요
        const requestBody = { selectedItems };

        try {
            const response = await axios.post(url, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            });

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            console.log('Success:', response.data);
            alert('도출되었습니다.');
            setSelectedItems([]); // 선택된 항목 초기화
            dispatch(fetchLaundrySelect(branchCode)); // fetchLaundrySelect 함수 다시 호출
            // 필요한 경우 서버 응답 처리 로직을 여기에 추가
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const Row = ({ item, onDoubleClick }) => {
        const [{ isDragging }, drag] = useDrag({
            type: ItemType.ROW,
            item,
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
        });

        return (
            <tr ref={drag} onDoubleClick={onDoubleClick} className="table-row" style={{ opacity: isDragging ? 0.5 : 1 }}>
                <td className="table-row">{item.laundryCode}</td>
                <td className="table-row">{item.laundryFabricType}</td>
                <td className="table-row">{item.laundryWeight}</td>
                <td className="table-row">{item.laundryDirtyLevel}</td>
                <td className="table-row">{item.dryCleaning ? '예' : '아니오'}</td>
            </tr>
        );
    };

    const SelectedRow = ({ item }) => (
        <tr>
            <td className="table-row">{item.laundryCode}</td>
            <td className="table-row">{item.laundryFabricType}</td>
            <td className="table-row">{item.laundryWeight}</td>
            <td className="table-row">{item.laundryDirtyLevel}</td>
            <td className="table-row">{item.dryCleaning ? '예' : '아니오'}</td>
            <td className="table-row">
                <button onClick={() => handleRemove(item)} style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>취소</button>
            </td>
        </tr>
    );

    return (
        <>  
            <div style={{ width: '95%', height: '90%' }}>
                <h5 style={{ marginLeft: '10px' }}>세탁방법 도출하기</h5>
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', gap: '30px' }}>
                    <div style={{ width: '47%', height: '85%' }}>
                        <div style={{ width: '100%', height: '80%', backgroundColor: '#F1F4F8', border: '1px solid #cfd7e0', borderRadius: '5px', overflow: 'auto' }}>
                            <table className='table1' style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                                <thead style={{ backgroundColor: '#e6f7ff' }}>
                                    <tr>
                                        <th style={{ border: '1px solid #cfd7e0', padding: '8px' }}>세탁코드</th>
                                        <th style={{ border: '1px solid #cfd7e0', padding: '8px' }}>옷감종류</th>
                                        <th style={{ border: '1px solid #cfd7e0', padding: '8px' }}>무게</th>
                                        <th style={{ border: '1px solid #cfd7e0', padding: '8px' }}>더러움정도</th>
                                        <th style={{ border: '1px solid #cfd7e0', padding: '8px' }}>드라이클리닝 여부</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLaundry.map(item => (
                                        <Row key={item.laundryCode} item={item} onDoubleClick={() => handleDrop(item)} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p style={{fontSize:'14px', color:'gray', marginTop:'5px'}}>*세탁물을 선택 후 오른쪽으로 드래그 해주세요*</p>
                    </div>
                    <div style={{ width: '47%', height: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div ref={drop} style={{ width: '100%', height: '80%', backgroundColor: isOver ? '#d3d3d3' : '#F1F4F8', border: '1px solid #cfd7e0', borderRadius: '5px', overflow: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                                <thead style={{ backgroundColor: '#e6f7ff' }}>
                                    <tr>
                                        <th style={{ border: '1px solid #cfd7e0', padding: '8px' }}>세탁코드</th>
                                        <th style={{ border: '1px solid #cfd7e0', padding: '8px' }}>옷감종류</th>
                                        <th style={{ border: '1px solid #cfd7e0', padding: '8px' }}>무게</th>
                                        <th style={{ border: '1px solid #cfd7e0', padding: '8px' }}>더러움정도</th>
                                        <th style={{ border: '1px solid #cfd7e0', padding: '8px' }}>드라이클리닝 여부</th>
                                        <th style={{ border: '1px solid #cfd7e0', padding: '8px' }}>취소</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedItems.map(item => (
                                        <SelectedRow key={item.laundryCode} item={item} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '2px' }}>
                            <button onClick={handleSubmit} style={{ marginTop: 'auto', backgroundColor: '#1890ff', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>도출하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LaundryDerivation;