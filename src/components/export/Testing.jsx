import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getCargo } from '../../redux/Action';
import { useDispatch, useSelector } from 'react-redux';
const handleChange = value => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};

const Testing = () => {
    const dispatch = useDispatch();
    const cargoDetailArrs = useSelector((state) => state.cargoDetailArr);
    const [selectedItems, setSelectedItems] = useState([]);
    const [cargoOpt, setCargoOpt] = useState([]);
    const [selectCargo, setSelectCargo] = useState([]);
    const opts = [
        {
            value: 'jack',
            label: 'Jack (100)',
        },
        {
            value: 'lucy',
            label: 'Lucy (101)',
        },
        {
            value: 'Wood',
            label: 'Wood',
        },
    ];
    useEffect(() => {
        dispatch(getCargo());
    }, []);

    //CargoDetail
    useEffect(() => {
        setCargoOpt(() => [
            ...cargoDetailArrs.map((x) => ({
                value: x.cargoDetailDesc,
                label: x.cargoDetailDesc,
            }))
        ]);
    }, [cargoDetailArrs]);

    useEffect(() => {
        setSelectCargo(cargoOpt[2]);
    }, [cargoOpt]);
        console.log(selectCargo);

    return (
        <Select
            labelInValue
            value={selectCargo}
            style={{ width: 120 }}
            onChange={setSelectCargo}
            options={cargoOpt}
        />
    );
};
export default Testing;