import { Component,OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { NgIf,NgFor } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})

export class MessagesComponent {
  message :string[] = [];

  constructor(public messageService:MessageService)
  {

  }


}

// export class MessagesComponent {

//   message:string[] = [];


//   constructor(public messageService:MessageService)
//   {   
//     this.message = this.messageService.messages;
//   }

//   get messages(): string[] {
//     return this.messageService.messages;
//   }


// }
