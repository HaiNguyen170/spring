import { Component, OnInit } from '@angular/core';
import { UploadService } from '../service/upload/upload.service'; 

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

	afuConfig = {
		multiple: true,
		formatsAllowed: ".docx, .pdf, .jpg, .png",
		maxSize: "50",
		uploadAPI:  {
		  url:"https://example-file-upload-api",
		  method:"POST",
		  params: {
			'page': '1'
		  },
		  responseType: 'blob',
		},
		theme: "dragNDrop",
		hideProgressBar: false,
		hideResetBtn: false,
		hideSelectBtn: false,
		fileNameIndex: true,
		replaceTexts: {
		  selectFileBtn: 'Select Files',
		  resetBtn: 'Reset',
		  uploadBtn: 'Upload',
		  dragNDropBox: 'Drag & Drop',
		  attachPinBtn: 'Attach Files...',
		  afterUploadMsg_success: 'Successfully Uploaded !',
		  afterUploadMsg_error: 'Upload Failed !',
		  sizeLimit: '- Size Limit'
		}
	};

	ngOnInit(): void { 
	} 
} 
