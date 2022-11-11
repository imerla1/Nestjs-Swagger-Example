import { Body, Controller, Param, Post, Query, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
import PostHelloBodyDTO from "./dto/PostHelloBody.dto";
import PostHelloQueryDTO from "./dto/PostHelloQuery.dto";

@Controller("/api")
@ApiTags("greet")
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation({description: "This is the main Description of an Endpoint."})
	/// Request Documentation
	@ApiParam({
		name: "name",
		description: "This Decorator specifies the documentation for a specific Parameter, in this case the <b>name</b> Param.",
		allowEmptyValue: false,
		examples: {
			a: {
				summary: "Name is Pete",
				description: "Pete can be provided as a name. See how it becomes a selectable option in the dropdown",
				value: "Pete"
			},
			b: {
				summary: "Name is Joe",
				value: "Joe"
			}
		}
	})
	@ApiQuery({
		name: "useExclamation",
		description: "This is the description of a query argument. In this instance, we have a boolean value.",
		type: Boolean,
		required: false // This value is optional
	})
	@ApiBody({
		type: PostHelloBodyDTO,
		description: "The Description for the Post Body. Please look into the DTO. You will see the @ApiOptionalProperty used to define the Schema.",
		examples: {
			a: {
				summary: "Empty Body",
				description: "Description for when an empty body is used",
				value: {} as PostHelloBodyDTO
			},
			b: {
				summary: "Hello Body",
				description: "Hello is used as the greeting",
				value: {greeting: "Hello"} as PostHelloBodyDTO
			}
		}

	})
	/// Response Documentation
	@ApiCreatedResponse({
		description: "This description defines when a 201 (Created) is returned. For @Post-Annotated Endpoints this is always present. When, for example, using a @Get-Endpoint, a 200 OK is always present instead.",
		schema: {
			type: "string",
			example: "Hello, Pete!"
			// For instructions on how to set a Schema, please refer to https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object-examples
		}
	})
	@ApiBadRequestResponse({
		description: "This description is for a 400 response. It is returned when additional query params are passed, or when the <b>useExclamation</b>-Argument could not be parsed as a boolean."
	})
	@ApiResponse({
		status: 417,
		description: "One can also provided a Status-Code directly, as seen here"
	})
	@Post(":name")
	public postHello(
		@Body(new ValidationPipe({
			transform: true,
			transformOptions: {enableImplicitConversion: true},
			forbidNonWhitelisted: true
		})) body: PostHelloBodyDTO,
		@Param("name") name: string,
		@Query(new ValidationPipe({
			transform: true,
			transformOptions: {enableImplicitConversion: true},
			forbidNonWhitelisted: true
		})) query : PostHelloQueryDTO) {
		return this.appService.postHello(body.greeting ?? "Hello", name, query.useExclamation ?? false);
	}
}
