import React, { useState, useContext } from "react";
import { Modal, Typography, message, Menu, Dropdown, Button } from 'antd';
import { LikeFilled, CloseCircleTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.css';
import NumberFormat from 'react-number-format';
import InvestmentContext from './context/InvestmentContext.js';

export default function InstructionsModal(props) {

	const { 
		investments,
		setInvestments 
	} = useContext(InvestmentContext);

	const [ step, setStep ] = useState(0);
	const [ modal, setModal ] = useState(true);
	const [ months, setMonths]  = useState(0);
	const [ rate, setRate ] = useState(0);
	const [ initial, setInitial ] = useState(0); 
	const [ monthly, setMonthly ] = useState(0);
	const menu = (
		<Menu onClick={(e)=> setMonths(+e.item.node.innerText)} style={{width:100}}>
		  <Menu.Item>
			  12
		  </Menu.Item>
		  <Menu.Item>
			  24
		  </Menu.Item>
		  <Menu.Item>
			  36
		  </Menu.Item>
		  <Menu.Item>
			  48
		  </Menu.Item>
		  <Menu.Item>
			  60
		  </Menu.Item>
		  <Menu.Item>
			  72
		  </Menu.Item>
		  <Menu.Item>
			  84
		  </Menu.Item>
		  <Menu.Item>
			  96
		  </Menu.Item>
		  <Menu.Item>
			  108
		  </Menu.Item>
		  <Menu.Item>
			  120
		  </Menu.Item>
		</Menu>
	  );
	const stepsProps = [
		{
			title: "¡Bienvenido a INBERSUS!",
			cancel: "¡Sacame del tutorial!",
			ok: "Continuar",
			text: [
				"INBERSUS es una aplicacion web que te permite simular como pueden crecer tus inversiones.",
				"Para empezar tu simulacion haz click en continuar, elige tu cantidad a invertir junto con un par de datos mas... !Y nosotros hacemos la magia!."
			],
			isVisible: "inline",
			type: null
		},
		{
			title: "1.-Elige una cantidad.",
			cancel: "Atras",
			ok: "Siguiente",
			text: [
				"Elige la cantidad inicial que deseas invertir, puede ser desde $1.00 hasta $999,999.99",
				"¡Cualquier cantidad es buena!"
			],
			isVisible: "inline",
			type: "validateCurrency",
			component: <NumberFormat allowNegative={false} onValueChange={(e)=> setInitial(+e.value)} className="input" value={initial} thousandSeparator={true} prefix={'$ '} />
		},
		{
			title: "2.-Elige un lapso de tiempo",
			cancel: "Atras",
			ok: "Siguiente",
			text: [
				"Elige un lapso de tiempo para tu inversión en meses, el mínimo permitido es 12 y el máximo es 120",
			],
			isVisible: "inline",
			type: "validateTime",
			component: <Dropdown overlay={menu} trigger="click" placement="bottomCenter">
				<Button style={{width:100}}>{months}</Button>
			</Dropdown>
		},
		{
			title: "3.- Elige el interes anual",
			cancel: "Atras",
			ok: "Siguiente",
			text: [
				"¡OJO! A mayor interes anual, mayor riesgo. Si decides tomar una inversion de alto riesgo ¡asegurate de lo que estas haciendo!",
			],
			isVisible: "inline",
			type: "validateRate",
			component: <NumberFormat allowNegative={false} onValueChange={(e)=> setRate(+e.value)} className="input" value={rate} thousandSeparator={true} suffix={' %'} />
		},
		{
			title:"4.- (Opcional) Deposito mensual",
			cancel:"Atras",
			ok:"Siguiente",
			text:[
				""
			],
			isVisible:"inline",
			type:"optional",
			component: <NumberFormat allowNegative={false} onValueChange={(e)=> setMonthly(+e.value)} className="input" value={monthly} thousandSeparator={true} prefix={'$ '} />

		}
	]

	const error = msg => {
		message.error(msg);
	};

	const addInvestment = () => {
		const newInvestment = {
			initial,
			months,
			monthly,
			rate
		};
		const existing = investments;
		setInvestments([...existing, newInvestment]);
		setModal(false)
	};

	const handleOk = (type) => {
		if(step === 4) {
			addInvestment();
			return;
		}

		switch (type) {
			case "validateCurrency":
				if (initial > 999999.99 || initial === 0) {
					error('Por favor, introduce una cantidad valida')
					return;
				}
				setInitial(initial)
				break;
			case "validateTime":
				if(months <= 0 || months > 120) {
					error('Por favor, introduce una cantidad valida');
					return;
				}
				break;
			case "validateRate":
				if(rate > 100) {
					error('El interes maximo aceptado es de 100%');
					return;
				}
			break;
			default:
		}
		const next = step + 1;
		setStep(next);
	};

	const handleCancel = () => {

		if(step !== 0) {
			const prev = step - 1;
			setStep(prev);
		} else {
			setModal(false)
		}

	}

	const { Title } = Typography;

	const currentStep = stepsProps[step]

	return (
		<div className="instruction-modal">
			<Modal
				bodyStyle={{height:200}}
				title={<Title level={3}>{currentStep.title}</Title>}
				closeIcon={<CloseCircleTwoTone />}
				visible={modal}
				onOk={() => handleOk(currentStep.type)}
				onCancel={handleCancel}
				okButtonProps={{ icon: <LikeFilled /> }}
				cancelButtonProps={{ icon: <CloseCircleTwoTone />, style: { display: currentStep.isVisible } }}
				cancelText={currentStep.cancel}
				okText={currentStep.ok}
				centered
			>
				{currentStep.text.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
				{currentStep.component !== null ? currentStep.component : null}
			</Modal>
		</div>
	);
}
