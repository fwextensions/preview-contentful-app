import React from 'react';
//import { Paragraph } from '@contentful/f36-components';
//import { SidebarExtensionSDK } from '@contentful/app-sdk';
//import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { Button } from "@contentful/f36-button";
import { Stack } from "@contentful/f36-core";

async function triggerBuildHook()
{
	try {
		await fetch(`${process.env.REACT_APP_BUILD_HOOK}`, {
			method: "POST",
		});
	} catch (e) {
		console.log(e);
	}
}

const Sidebar = () => {
//	const sdk = useSDK<SidebarExtensionSDK>();
	/*
		 To use the cma, inject it as follows.
		 If it is not needed, you can remove the next line.
	*/
	// const cma = useCMA();

	return (
		<Stack flexDirection="column" spacing="spacingM">
			<Button size="medium" isFullWidth onClick={triggerBuildHook}>
				Build Netlify Preview
			</Button>
			<Button size="medium" isFullWidth as="a" href={process.env.REACT_APP_NETLIFY_URL} target="_blank">
				Open Netlify
			</Button>
		</Stack>
	);

//	return <Paragraph>Hello Sidebar Component (AppId: {sdk.ids.app})</Paragraph>;
};

export default Sidebar;
