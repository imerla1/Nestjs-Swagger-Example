import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	public postHello(greeting: string, name: string, useExclamation: boolean): string {
		return `${greeting} ${name}${useExclamation ? "!" : "."}`;
	}
}
