import React, { Component } from 'react'
import Script from 'react-load-script'

import '../client/index.styl'

import Wallet from '../../components/wallet/index.jsx'
import Toolbar from '../../components/toolbar/index.jsx'

import Actions from '../../components/actions/index.jsx'

import Moderation from '../../components/dialogs/moderation/index.jsx'

import Poll from '../../components/poll/poll.jsx'

export default class Room extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<div className='client'>
				<Actions />

				<div className='room' id='game'></div>

				<Moderation />

				<Poll question='Cyclone or Habbo' status={false} />

				<Wallet />
				<Toolbar isClient={true} />
			</div>
		)
	}
}