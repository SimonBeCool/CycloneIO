import { injectable, inject } from 'inversify'
import * as PIXI from 'pixi.js'
import { Viewport } from "pixi-viewport";

import ISocketManager from './communication/ISocketManager';
import IRoomManager from "./rooms/IRoomManager";
import RoomScene from "./rooms/RoomScene";

@injectable()
export default class Habbo {
	public static readonly DEBUG = true

	public application: PIXI.Application
	public viewport: Viewport

	private socketManager: ISocketManager
	private roomManager: IRoomManager

	public constructor(
		@inject('ISocketManager') socketManager: ISocketManager,
		@inject('IRoomManager') roomManager: IRoomManager
	) {
		this.socketManager = socketManager
		this.roomManager = roomManager
	}

	public init(parent: string, socket: SocketIOClient.Socket): void {
		const parentElement = document.getElementById(parent)

		if (!parentElement) {
			throw `${parent} is not an element.`
		}

		this.socketManager.init(socket)

		const config = {
			width: window.innerWidth,
			height: window.innerHeight,
			resolution: window.devicePixelRatio,
			resizeTo: parentElement
		}

		this.viewport = new Viewport()
		this.application = new PIXI.Application(config)

		this.application.stage.addChild(this.viewport)

		this.viewport.drag()

		parentElement.appendChild(this.application.view)
	}

	public loadRoom(room: RoomScene): void {
		this.viewport.addChildAt(room, 0)
	}

	public get loader(): PIXI.Loader {
		return this.application.loader
	}
}
