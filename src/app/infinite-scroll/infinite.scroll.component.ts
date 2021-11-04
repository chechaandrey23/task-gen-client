import { isPlatformBrowser } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Inject,
	Input,
	OnDestroy,
	Output,
	PLATFORM_ID,
	ViewChild,
	TemplateRef,
	ViewContainerRef
} from '@angular/core';

export interface InfiniteScrollOptions {
	[key: string]: any;
	root: any;
}

@Component({
	selector: 'infinite-scroll',
	templateUrl: './infinite.scroll.component.html',
	styleUrls: ['./infinite.scroll.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {
	
	@Input() options: Partial<InfiniteScrollOptions> = {};
	
	@Input() anchorTemlate: TemplateRef<any>;
	
	@Output() scrolled = new EventEmitter<void>();
	
	@ViewChild('anchor') anchor: ElementRef<HTMLElement>;
	
	@ViewChild('anchor',{read:ViewContainerRef}) viewcontainer : ViewContainerRef;
	
	private observer!: IntersectionObserver;
	
	constructor(private host: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}
	
	ngOnDestroy(): void {
		if(isPlatformBrowser(this.platformId)) {
			this.observer.disconnect();
		}
	}
	
	ngAfterViewInit(): void {
		if(isPlatformBrowser(this.platformId)) {
			this.observer = new IntersectionObserver(([entry]) => entry.isIntersecting && this.scrolled.emit(), {
				root: this.isHostScrollable() ? this.host.nativeElement : null,
				...this.options
			});
			this.observer.observe(this.anchor.nativeElement);
			// add tempalte
			this.viewcontainer.createEmbeddedView(this.anchorTemlate);
		}
	}
	
	private isHostScrollable(): boolean {
		if(isPlatformBrowser(this.platformId)) {
			const style = window.getComputedStyle(this.host.nativeElement);
			return style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';
		}
		return false;
	}
}
